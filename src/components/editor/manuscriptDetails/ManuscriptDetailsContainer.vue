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

const showActionModal = ref(false)
const actionType = ref(null)
const messageText = ref('')

const releases = ref([])
const volumes = ref([])
const selectedVolume = ref(null)

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

  await axios.patch(`http://localhost:3001/manuscripts/${props.manuscript.manuscriptId}`, {
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

/*Действия с рукописью*/
const actionTitleMap = {
  reject: 'Отклонить',
  revision: 'На доработку',
  publish: 'Опубликовать',
}

const stageMap = {
  reject: 'Отклонено',
  revision: 'На доработке',
  publish: 'Опубликовано',
}

const notifTitleMap = {
  reject: 'Рукопись отклонена',
  revision: 'Рукопись отправлена на доработку',
  publish: 'Рукопись опубликована',
}

/*Подгружаем текущий выпуск и тома выпуска*/
const loadPublishingData = async () => {
  const [relRes, volRes] = await Promise.all([
    axios.get('http://localhost:3001/releases'),
    axios.get('http://localhost:3001/volumes'),
  ])

  releases.value = relRes.data
  volumes.value = volRes.data
}

const currentRelease = computed(() => {
  const currentYear = new Date().getFullYear()
  return releases.value.find((r) => r.year === currentYear)
})

const currentVolumes = computed(() => {
  if (!currentRelease.value) return []

  return volumes.value.filter((v) => currentRelease.value.volumes.includes(v.volId))
})

/*Открытие окна после нажатия на кнопки удалить/отправить на доработку/опубликовать рукопись */
const openActionModal = async (type) => {
  actionType.value = type
  messageText.value = ''
  showActionModal.value = true

  if (type === 'publish') {
    await loadPublishingData()
  }
}

/*Совершение действия с рукописью*/
const submitAction = async () => {
  const today = new Date().toISOString().split('T')[0]

  /* 1. обновляем события рукописи */
  const updatedEvents = [
    ...(props.manuscript.events || []),
    {
      event: notifTitleMap[actionType.value],
      user: 1,
      date: today,
    },
  ]

  await axios.patch(`http://localhost:3001/manuscripts/${props.manuscript.id}`, {
    stage: stageMap[actionType.value],
    events: updatedEvents,
  })

  if (actionType.value === 'reject') {
    await deleteTaskByManuscript()
  }

  if (actionType.value === 'publish') {
    await deleteTaskByManuscript()
  }

  // 2. получаем пользователей
  const usersRes = await axios.get('http://localhost:3001/users')
  const users = usersRes.data

  // 3. ищем авторов → пользователей
  const authors = props.manuscript.authorsId

  const targetUsers = users.filter((u) => authors.includes(u.userId))

  // 4. добавляем уведомления
  for (const user of targetUsers) {
    const newNotif = {
      id: Date.now(),
      title: notifTitleMap[actionType.value],
      text: messageText.value,
      date: today,
    }

    const updatedNotifs = [...(user.notifs || []), newNotif]

    await axios.patch(`http://localhost:3001/users/${user.id}`, {
      notifs: updatedNotifs,
    })
  }

  if (actionType.value === 'publish') {
    if (!selectedVolume.value) {
      alert('Выберите том')
      return
    }

    /* Если опубликовывается рукопись*/
    const volume = volumes.value.find((v) => v.volId === selectedVolume.value)

    const updatedManuscripts = [...(volume.manuscripts || []), props.manuscript.id]

    await axios.patch(`http://localhost:3001/volumes/${volume.id}`, {
      manuscripts: updatedManuscripts,
    })
  }
  showActionModal.value = false
  location.reload()
}

const isReadonly = computed(() => {
  return props.manuscript.stage === 'Опубликовано' || props.manuscript.stage === 'Отклонено'
})

const deleteTaskByManuscript = async () => {
  const tasksRes = await axios.get('http://localhost:3001/tasks')

  const task = tasksRes.data.find((t) => Number(t.manuscriptId) === Number(props.manuscript.id))

  if (task) {
    await axios.delete(`http://localhost:3001/tasks/${task.id}`)
  }
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
            <template v-if="!isReadonly">
              <ReplaceFileButton :index="index" :manuscript="manuscript" />
              <DeleteFileButton :index="index" @ask-delete="openDeleteOverlay" />
            </template>
          </li>
        </ul>
        <AddManuscriptFileButton v-if="!isReadonly" :manuscript="manuscript" />
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
      <ChangeRedactors v-if="!isReadonly" @open="showRedactorsOverlay = true" />
    </div>
  </div>

  <!-- ДЕЙСТВИЯ -->
  <div v-if="!isReadonly">
    <div class="section-name">Действия:</div>

    <div class="actions-block">
      <button class="bright-button editor" @click="openActionModal('reject')">
        Отклонить рукопись
      </button>

      <button class="bright-button editor" @click="openActionModal('revision')">
        Отправить на доработку
      </button>

      <button class="bright-button editor" @click="openActionModal('publish')">
        Опубликовать рукопись
      </button>
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

  <!-- Оверлей действий с рукописью -->
  <div v-if="showActionModal" class="overlay">
    <div class="search-modal">
      <div class="modal-header">
        <span>Действия с рукописью</span>
        <span class="close-btn" @click="showActionModal = false">✕</span>
      </div>

      <div class="section-name" style="margin-top: 16px">
        {{ actionTitleMap[actionType] }}
      </div>

      <div v-if="actionType === 'publish'">
        <div class="section-name">Выберите том</div>

        <div class="modal-containers">
          <div v-for="vol in currentVolumes" :key="vol.id">
            <label class="modal-cards">
              <input type="radio" :value="vol.volId" v-model="selectedVolume" />
              Том {{ vol.volId }}
            </label>
          </div>
        </div>
      </div>

      <textarea
        class="input"
        rows="5"
        placeholder="Введите текст уведомления"
        v-model="messageText"
      ></textarea>

      <button class="bright-button editor" @click="submitAction">Отправить</button>
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
