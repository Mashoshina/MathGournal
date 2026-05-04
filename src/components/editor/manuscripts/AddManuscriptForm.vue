<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import VueFeather from 'vue-feather'

const props = defineProps({
  authors: Array,
  redactors: Array,
})

const emit = defineEmits(['saved'])

const title = ref('')
const description = ref('')
const keywords = ref('')
const chapter = ref('')

const authorSearch = ref('')
const selectedAuthors = ref([])

const manuscriptFiles = ref([])
const coverLetterFiles = ref([])

const validationError = ref(false)

/*Проверка формы на заполение обязательных полей*/
function isFormValid() {
  return (
    title.value.trim() &&
    description.value.trim() &&
    keywords.value.trim() &&
    chapter.value.trim() &&
    selectedAuthors.value.length > 0
  )
}

/*Загрузка файлов рукописи*/
function handleManuscriptFiles(e) {
  manuscriptFiles.value = Array.from(e.target.files)
}

/*Загрузка файлов сопроводительного письма*/
function handleCoverLetterFiles(e) {
  coverLetterFiles.value = Array.from(e.target.files)
}

const filteredAuthors = computed(() => {
  if (!authorSearch.value) return props.authors

  const query = authorSearch.value.toLowerCase()

  return props.authors.filter(
    (a) => a.name.toLowerCase().includes(query) || a.mail.toLowerCase().includes(query),
  )
})

/*Сохранение рукописи*/
async function saveManuscript() {
  if (!isFormValid()) {
    validationError.value = true
    return
  }

  /*Добавление начальных событий*/
  validationError.value = false

  const manuscriptId = Date.now()

  const today = new Date().toISOString().slice(0, 10)

  const events = [
    {
      event: 'Статья получена',
      user: 0,
      date: today,
      version: 1,
    },
    {
      event: 'Главный редактор Евгений Фёдоров назначен',
      user: 0,
      date: today,
      version: 1,
    },
  ]

  /* Обновление manuscripts в db.json*/
  const manuscript = {
    manuscriptId,
    stage: 'В процессе',
    redactorStatus: 'mine',
    redactorsId: [1],
    title: title.value,
    authorsId: selectedAuthors.value,
    keyWords: keywords.value.split(','),
    description: description.value,
    chapter: chapter.value,
    manuscriptFiles: manuscriptFiles.value.map((f) => `/public/manuscripts/${f.name}`),
    coverLetter: coverLetterFiles.value.map((f) => `/public/manuscripts/${f.name}`),
    sentDate: new Date().toISOString().slice(0, 10),
    version: 1,
    events: events,
  }

  const res = await axios.post('http://localhost:3001/manuscripts', manuscript)

  const newManuscript = res.data

  /* Обновление tasks в db.json*/
  const task = {
    taskId: `ЛК-${Date.now()}`,
    manuscriptId: newManuscript.manuscriptId,
    createdAt: newManuscript.sentDate,
    type: 'Найти и пригласить рецензентов',
    stage: 'Рецензенты не приглашены',
    invitedReviewersId: [],
    acceptedReviewersId: [],
    declinedReviewersId: [],
    reviewesId: [],
  }

  await axios.post('http://localhost:3001/tasks', task)

  emit('saved')
}
</script>

<template>
  <div class="form">
    <div class="required-note" :class="{ error: validationError }">* — обязательные поля</div>

    <!-- Поле названия -->
    <input
      v-model="title"
      placeholder="Название статьи*"
      class="input"
      :class="{ invalid: validationError && !title }"
    />

    <!-- Поле описания -->
    <textarea
      v-model="description"
      placeholder="Описание*"
      class="input"
      :class="{ invalid: validationError && !title }"
    />

    <!-- Поле ключевых слов -->
    <input
      v-model="keywords"
      placeholder="Ключевые слова (через запятую)*"
      class="input"
      :class="{ invalid: validationError && !title }"
    />

    <!-- Поле раздела -->
    <input
      v-model="chapter"
      placeholder="Раздел*"
      class="input"
      :class="{ invalid: validationError && !title }"
    />

    <!-- Поиск авторов -->
    <div class="section-name">Авторы*</div>
    <input
      v-model="authorSearch"
      placeholder="Поиск автора по имени или почте"
      class="search-input-big"
    />
    <div class="modal-containers">
      <label v-for="author in filteredAuthors" :key="author.id">
        <div class="modal-cards">
          <input type="checkbox" :value="author.authorsId" v-model="selectedAuthors" />
          {{ author.name }}
        </div>
      </label>
    </div>

    <!-- Загрузка файлов -->
    <div>
      <div class="section-name">Файлы рукописи*</div>

      <input type="file" class="general-button editor" multiple @change="handleManuscriptFiles" />
    </div>
    <div>
      <div class="section-name">Сопроводительное письмо</div>

      <input type="file" class="general-button editor" multiple @change="handleCoverLetterFiles" />
    </div>

    <button class="bright-button editor" @click="saveManuscript">
      Сохранить
      <vue-feather type="save" size="20" />
    </button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.required-note {
  font-family: var(--font-Biryani);
  font-weight: var(--normal-weight);
  font-size: var(--size-nm);
  transition: all 0.2s ease;
  color: var(--black);
}

.required-note.error {
  color: var(--red);
  font-weight: 600;
}
</style>
