<script setup>
import { computed, ref, watch } from 'vue'
import axios from 'axios'

import DeleteFileButton from './DeleteFileButton.vue'
import ReplaceFileButton from './ReplaceFileButton.vue'
import AddManuscriptFileButton from './AddManuscriptFileButton.vue'
import ChangeRedactors from './ChangeRedactors.vue'

const showDeleteOverlay = ref(false)
const fileIndexToDelete = ref(null)

const showRedactorsOverlay = ref(false)

const selectedRedactors = ref([])
const searchQuery = ref('')

const props = defineProps({
  manuscript: Object,
  authors: Array,
  redactors: Array,
  reviews: Array,
  reviewers: Array,
})

watch(
  () => props.manuscript,
  () => {
    selectedRedactors.value = [...props.manuscript.redactorsId]
  },
  { immediate: true },
)

const manuscriptAuthors = computed(() => {
  return props.manuscript.authorsId.map((id) => props.authors.find((a) => a.authorsId === id))
})

const manuscriptRedactors = computed(() => {
  return props.redactors.filter((r) => props.manuscript.redactorsId.includes(r.redactorsId))
})

const manuscriptReviews = computed(() => {
  return props.reviews.filter((r) => Number(r.manuscriptId) === Number(props.manuscript.id))
})

const reviewsWithReviewer = computed(() => {
  return manuscriptReviews.value.map((review) => {
    const reviewer = props.reviewers.find((r) => r.reviewersId === review.reviewersId)

    return {
      ...review,
      reviewerName: reviewer?.name || 'Неизвестный рецензент',
    }
  })
})

const filteredRedactors = computed(() => {
  if (!searchQuery.value) return props.redactors

  return props.redactors.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.mail.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const deleteFile = async () => {
  const files = [...props.manuscript.manuscriptFiles]

  files.splice(fileIndexToDelete.value, 1)

  await axios.patch(`http://localhost:3001/manuscripts/${props.manuscript.id}`, {
    manuscriptFiles: files,
    version: props.manuscript.version + 1,
  })

  location.reload()
}

const openDeleteOverlay = (index) => {
  fileIndexToDelete.value = index
  showDeleteOverlay.value = true
}

const saveRedactors = async () => {
  const newEvent = {
    event: 'Список редакторов изменён',
    user: 1,
    date: new Date().toISOString().split('T')[0],
  }

  await axios.patch(`http://localhost:3001/manuscripts/${props.manuscript.id}`, {
    redactorsId: selectedRedactors.value,
    events: [...(props.manuscript.events || []), newEvent],
  })

  location.reload()
}
</script>

<template>
  <div>
    <!-- Описание -->
    <div class="section-name">Описание</div>
    <div class="section-text">
      {{ manuscript.description }}
    </div>

    <!-- Ключевые слова -->
    <div class="section-text">
      Ключевые слова:
      <ul>
        <li v-for="word in manuscript.keyWords" :key="word">
          {{ word }}
        </li>
      </ul>
    </div>

    <!-- Материалы -->
    <div class="section-name">Материалы</div>
    <div class="section-text">
      Файлы рукописи:
      <div class="materials-block">
        <ul v-if="manuscript.manuscriptFiles?.length">
          <li v-for="(file, index) in manuscript.manuscriptFiles" :key="file">
            <a :href="file.replace('./public', '')" target="_blank">
              {{ file.split('/').pop() }}
            </a>
            <template v-if="manuscript.stage !== 'Опубликовано'">
              <ReplaceFileButton :index="index" :manuscript="manuscript" />
              <DeleteFileButton :index="index" @ask-delete="openDeleteOverlay" />
            </template>
          </li>
        </ul>
        <AddManuscriptFileButton
          v-if="manuscript.stage !== 'Опубликовано'"
          :manuscript="manuscript"
        />
      </div>
    </div>

    <!-- Сопроводительное письмо -->
    <div class="section-text">
      Сопроводительное письмо:
      <div class="materials-block">
        <ul v-if="manuscript.coverLetter?.length">
          <li v-for="file in manuscript.coverLetter" :key="file">
            <a :href="file.replace('./public', '')" target="_blank">
              {{ file.split('/').pop() }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Рецензии -->
    <div class="section-text">
      Рецензии:
      <div class="materials-block">
        <div v-if="reviewsWithReviewer.length === 0">Рецензий нет</div>
        <ul v-else>
          <li v-for="review in reviewsWithReviewer" :key="review.id">
            {{ review.reviewerName }}:

            <a
              v-for="file in review.reviewesFiles"
              :key="file"
              :href="file.replace('./public', '')"
              target="_blank"
            >
              {{ file.split('/').pop() }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Авторы -->
    <div class="section-name">Автор(ы):</div>
    <div class="section-text">
      <ul>
        <li v-for="author in manuscriptAuthors" :key="author.id">
          {{ author.name }} | {{ author.mail }}
        </li>
      </ul>
    </div>

    <!-- редактор -->
    <div class="section-name">Редакторы</div>
    <div class="section-text">
      <div v-if="manuscriptRedactors.length">
        <div v-for="redactor in manuscriptRedactors" :key="redactor.id">
          {{ redactor.name }} | {{ redactor.mail }}
        </div>
      </div>

      <div v-else>Без редакторв</div>
      <ChangeRedactors
        v-if="manuscript.stage !== 'Опубликовано'"
        @open="showRedactorsOverlay = true"
      />
    </div>
  </div>

  <!-- ДЕЙСТВИЯ -->
  <div v-if="manuscript.stage !== 'Опубликовано'">
    <div class="section-name">Действия:</div>

    <div class="actions-block">
      <button class="bright-button editor" @click="rejectManuscript">Отклонить рукопись</button>

      <button class="bright-button editor" @click="sendToRevision">Отправить на доработку</button>

      <button class="bright-button editor" @click="publishManuscript">Опубликовать рукопись</button>
    </div>
  </div>

  <div v-if="showDeleteOverlay" class="overlay">
    <div class="confirm-modal">
      <p>Удалить файл?</p>

      <div class="confirm-buttons">
        <button class="general-button editor" @click="showDeleteOverlay = false">Нет</button>

        <button class="general-button editor" @click="deleteFile">Удалить</button>
      </div>
    </div>
  </div>

  <div v-if="showRedactorsOverlay" class="overlay">
    <div class="search-modal">
      <div class="modal-header">
        <div class="section-name">Изменить список редакторов</div>
        <span class="close-btn" @click="showRedactorsOverlay = false">✕</span>
      </div>

      <!-- текущие редакторы -->
      <div class="section-name">Текущие редакторы</div>
      <div class="modal-containers">
        <div v-if="manuscriptRedactors.length">
          <div v-for="r in manuscriptRedactors" :key="r.id">
            <label>
              <div class="modal-cards">
                <input type="checkbox" :value="r.redactorsId" v-model="selectedRedactors" />
                {{ r.name }} | {{ r.mail }}
              </div>
            </label>
          </div>
        </div>
        <div v-else>Редакторов нет</div>
      </div>

      <!-- поиск -->
      <div class="section-name">Поиск редакторов</div>

      <input
        v-model="searchQuery"
        placeholder="Поиск редакторов по имени или почте"
        class="search-input-small"
      />

      <div class="modal-containers">
        <div v-for="r in filteredRedactors" :key="r.id">
          <label>
            <div class="modal-cards">
              <input type="checkbox" :value="r.redactorsId" v-model="selectedRedactors" />
              {{ r.name }} | {{ r.mail }}
            </div>
          </label>
        </div>
      </div>

      <!-- кнопка -->
      <div class="save-block">
        <button class="general-button editor" @click="saveRedactors">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<style>
.save-block {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
