<script setup>
import { computed } from 'vue'
import axios from 'axios'
import { ref } from 'vue'

import ChapterSortDropdown from './ChapterSortDropdown.vue'
import CountSortDropdown from './CountSortDropdown.vue'

const showConfirm = ref(false)
const confirmType = ref(null) // cancel | repeat
const selectedReviewer = ref(null)

const showReviewerSearch = ref(false)

const searchQuery = ref('')
const countFilter = ref('all')
const chapterFilter = ref('all')

const props = defineProps({
  activeTab: String,
  task: Object,
  manuscript: Object,
  authors: Array,
  reviewers: Array,
  reviews: Array,
  users: Array,
})

/* Рецензии к рукописи */
const manuscriptReviews = computed(() => {
  return props.reviews.filter((r) => Number(r.manuscriptId) === Number(props.manuscript.id))
})

/* Рецензии с именами рецензентов */
const reviewsWithReviewer = computed(() => {
  return manuscriptReviews.value.map((review) => {
    const reviewer = props.reviewers.find(
      (rev) => Number(rev.reviewersId) === Number(review.reviewersId),
    )

    return {
      ...review,
      reviewerName: reviewer ? reviewer.name : 'Неизвестный рецензент',
      reviewerMail: reviewer ? reviewer.mail : '',
    }
  })
})

/* Получаем авторов */
const manuscriptAuthors = computed(() => {
  return props.manuscript.authorsId.map((id) => props.authors.find((a) => a.authorsId === id))
})

/* Получаем рецензентов */
const getReviewersByIds = (ids) => {
  return props.reviewers.filter((reviewer) => ids.includes(reviewer.reviewersId))
}

/* Принявшие рецензенты*/
const acceptedReviewers = computed(() => getReviewersByIds(props.task.acceptedReviewersId || []))

/* Отклонившие рецензенты*/
const declinedReviewers = computed(() => getReviewersByIds(props.task.declinedReviewersId || []))

/* Приглашённые (ещё не ответили) */
const invitedPendingReviewers = computed(() => {
  const invited = props.task.invitedReviewersId || []
  const accepted = props.task.acceptedReviewersId || []
  const declined = props.task.declinedReviewersId || []

  const pendingIds = invited.filter((id) => !accepted.includes(id) && !declined.includes(id))

  return getReviewersByIds(pendingIds)
})

/* Открытие оверлея уверенности */
const openCancelConfirm = (reviewer) => {
  confirmType.value = 'cancel'
  selectedReviewer.value = reviewer
  showConfirm.value = true
}

const openRepeatConfirm = (reviewer) => {
  confirmType.value = 'repeat'
  selectedReviewer.value = reviewer
  showConfirm.value = true
}

/* Закрытие оверлея уверенности */
const closeConfirm = () => {
  showConfirm.value = false
  selectedReviewer.value = null
}

/* Чтобы менялось db.json */
const confirmAction = async () => {
  if (!selectedReviewer.value) return

  const reviewerId = selectedReviewer.value.reviewersId

  const task = { ...props.task }

  if (confirmType.value === 'cancel') {
    task.invitedReviewersId = task.invitedReviewersId.filter((id) => id !== reviewerId)

    task.acceptedReviewersId = task.acceptedReviewersId.filter((id) => id !== reviewerId)
  }

  if (confirmType.value === 'repeat') {
    task.declinedReviewersId = task.declinedReviewersId.filter((id) => id !== reviewerId)

    if (!task.invitedReviewersId.includes(reviewerId)) {
      task.invitedReviewersId.push(reviewerId)
    }
  }

  await axios.patch(`http://localhost:3001/tasks/${task.id}`, task)

  closeConfirm()

  location.reload()
}

/* Оверлей поиска рецензентов */
const filteredReviewers = computed(() => {
  let result = props.reviewers

  // поиск
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()

    result = result.filter((r) => {
      return r.name.toLowerCase().includes(query) || r.mail.toLowerCase().includes(query)
    })
  }

  // фильтр по количеству работ
  if (countFilter.value !== 'all') {
    result = result.filter((r) => {
      const count = r.countReviews

      if (countFilter.value === 'lt10') return count < 10
      if (countFilter.value === '10-50') return count >= 10 && count <= 50
      if (countFilter.value === '50-100') return count > 50 && count <= 100
      if (countFilter.value === 'gt100') return count > 100
    })
  }

  // фильтр по направлению
  if (chapterFilter.value !== 'all') {
    result = result.filter((r) => r.mainChapter === chapterFilter.value)
  }

  return result
})

const setCountFilter = (value) => {
  countFilter.value = value
}

const setChapterFilter = (value) => {
  chapterFilter.value = value
}

/* Приглашаем рецензента */
const inviteReviewer = async (reviewer) => {
  const reviewerId = reviewer.reviewersId

  const task = { ...props.task }

  if (task.invitedReviewersId.includes(reviewerId)) {
    alert('Этот рецензент уже приглашён')
    return
  }

  // добавляем рецензента в задачу
  task.invitedReviewersId.push(reviewerId)

  await axios.patch(`http://localhost:3001/tasks/${task.id}`, task)

  // Добавляем событие в рукопись
  const manuscript = { ...props.manuscript }

  // Если вдруг events нет
  if (!manuscript.events) {
    manuscript.events = []
  }

  // Добавление события
  manuscript.events.push({
    event: 'Рецензенты приглашены',
    user: 1,
    date: new Date().toISOString().split('T')[0],
    version: manuscript.version,
  })

  await axios.patch(`http://localhost:3001/manuscripts/${manuscript.id}`, manuscript)

  showReviewerSearch.value = false
  location.reload()
}

/* Получить имя пользователя по id */
const getUserName = (id) => {
  const user = props.users.find((u) => Number(u.userId) === Number(id))
  return user ? user.name : 'Неизвестный пользователь'
}

/* Формируем таблицу истории */
const groupedEvents = computed(() => {
  if (!props.manuscript?.events) return []

  const groups = {}

  props.manuscript.events.forEach((event) => {
    const version = event.version || 1

    if (!groups[version]) {
      groups[version] = []
    }

    groups[version].push(event)
  })

  // сортировка событий внутри версии
  Object.keys(groups).forEach((version) => {
    groups[version].sort((a, b) => new Date(a.date) - new Date(b.date))
  })

  // сортируем события по версии
  return Object.keys(groups)
    .sort((a, b) => Number(a) - Number(b))
    .map((version) => ({
      version,
      events: groups[version],
    }))
})
</script>

<template>
  <!-- Обзор -->
  <div v-if="activeTab === 'overview'">
    <div class="text-blocks">
      <div class="section-name big">Описание:</div>
      <div class="section-text">{{ manuscript.description }}</div>

      <div class="section-text">
        Ключевые слова:
        <ul>
          <li v-for="word in manuscript.keyWords" :key="word">
            {{ word }}
          </li>
        </ul>
      </div>

      <!-- Материалы задачи -->
      <div class="section-name big">Материалы задачи:</div>
      <div class="section-text">
        Файлы рукописи:
        <ul v-if="manuscript.manuscriptFiles?.length">
          <li v-for="file in manuscript.manuscriptFiles" :key="file">
            <a :href="file.replace('./public', '')" target="_blank" class="materials-block editor">
              {{ file.split('/').pop() }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Сопроводительное письмо -->
      <div class="section-text">
        Сопроводительное письмо:
        <ul v-if="manuscript.coverLetter?.length">
          <li v-for="file in manuscript.coverLetter" :key="file">
            <a :href="file.replace('./public', '')" target="_blank" class="materials-block editor">
              {{ file.split('/').pop() }}
            </a>
          </li>
        </ul>
        <div v-else>Нет сопроводительного письма</div>
      </div>

      <!-- Рецензии -->
      <div class="section-text">
        Рецензии:
        <div v-if="reviewsWithReviewer.length === 0">Рецензий нет</div>

        <ul v-else>
          <li v-for="review in reviewsWithReviewer" :key="review.id">
            {{ review.reviewerName }} ({{ review.reviewerMail }}):
            <a
              v-for="file in review.reviewesFiles"
              :key="file"
              :href="file.replace('./public', '')"
              target="_blank"
              class="materials-block editor"
            >
              {{ file.split('/').pop() }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Авторы -->
      <div class="section-name big">
        Автор(ы):
        <div class="section-text">
          <ul>
            <li v-for="author in manuscriptAuthors" :key="author.id">
              {{ author.name }}:&nbsp; {{ author.mail }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Рецензенты -->
  <div v-if="activeTab === 'reviewerss'">
    <!-- Приглашённые -->
    <div class="text-blocks">
      <div class="section-name big">Приглашённые рецензенты</div>
      <div v-if="invitedPendingReviewers.length === 0">
        <div class="section-text bottom-border">Нет приглашённых рецензентов</div>
      </div>

      <div v-for="reviewer in invitedPendingReviewers" :key="reviewer.id" class="reviewer-row">
        <span>{{ reviewer.name }}</span>
        <span>{{ reviewer.mail }}</span>
        <button class="general-button editor" @click="openCancelConfirm(reviewer)">
          Отменить приглашение
        </button>
      </div>

      <!-- Принявшие -->
      <div class="section-name big">Принявшие приглашение</div>

      <div v-if="acceptedReviewers.length === 0">
        <div class="section-text bottom-border">Нет принявших рецензентов</div>
      </div>

      <div v-for="reviewer in acceptedReviewers" :key="reviewer.id" class="reviewer-row">
        <span>{{ reviewer.name }}</span>
        <span>{{ reviewer.mail }}</span>
        <button class="general-button editor" @click="openCancelConfirm(reviewer)">
          Отменить приглашение
        </button>
      </div>

      <!-- Отклонившие -->
      <div class="section-name big">Отклонившие приглашение</div>

      <div v-if="declinedReviewers.length === 0">
        <div class="section-text bottom-border">Нет отклонивших рецензентов</div>
      </div>

      <div v-for="reviewer in declinedReviewers" :key="reviewer.id" class="reviewer-row">
        <span>{{ reviewer.name }}</span>
        <span>{{ reviewer.mail }}</span>
        <button class="general-button editor" @click="openRepeatConfirm(reviewer)">
          Повторить приглашение
        </button>
      </div>
    </div>

    <!-- Кнопка поиска -->
    <div class="find-reviewers">
      <button class="bright-button editor" @click="showReviewerSearch = true">
        Найти рецензентов
      </button>
    </div>
  </div>

  <!--Оверлей уверенности-->
  <div v-if="showConfirm" class="overlay">
    <div class="modals confirm-modal">
      <p v-if="confirmType === 'cancel'">Вы уверены, что хотите отменить приглашение?</p>

      <p v-if="confirmType === 'repeat'">Вы уверены, что хотите повторить приглашение?</p>

      <div class="confirm-buttons">
        <button class="general-button editor" @click="confirmAction">Да</button>

        <button class="general-button editor" @click="closeConfirm">Нет</button>
      </div>
    </div>
  </div>

  <!-- Overlay поиска рецензентов -->
  <div v-if="showReviewerSearch" class="overlay">
    <div class="modals search-modal">
      <div class="modal-header">
        <div class="section-name big">Найти рецензентов</div>
        <span class="close-btn" @click="showReviewerSearch = false">✕</span>
      </div>
      <div class="modals form">
        <!-- Поиск -->
        <input
          v-model="searchQuery"
          class="search-input-small"
          placeholder="Поиск рецензентов по имени или почте"
          style="margin-top: 12px"
        />

        <!--Фильтры поиска рецензента-->
        <div class="section-name big">Фильтры поиска</div>

        <div class="filters-row">
          <CountSortDropdown :countFilter="countFilter" @change-filter="setCountFilter" />

          <ChapterSortDropdown :chapterFilter="chapterFilter" @change-filter="setChapterFilter" />
        </div>

        <!-- карточки -->
        <div class="modal-containers">
          <div
            v-for="reviewer in filteredReviewers"
            :key="reviewer.reviewersId"
            class="modal-cards"
          >
            <div class="hyper-links editor" @click="inviteReviewer(reviewer)">
              {{ reviewer.name }}
            </div>

            <div class="card-info-block">
              {{ reviewer.mail }}
            </div>

            <div class="card-info-block">
              {{ reviewer.mainChapter }}
            </div>

            <div class="card-info-block">
              Работ: {{ reviewer.countReviews }} • Приглашений: {{ reviewer.ivitesCount }} •
              Отклонений: {{ reviewer.declineCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- История -->
  <div v-if="activeTab === 'history'">
    <div v-for="group in groupedEvents" :key="group.version" class="version-block">
      <!-- Заголовок версии -->
      <div class="section-name big">Версия {{ group.version }}</div>

      <!-- Таблица -->
      <div class="tables">
        <!-- Заголовки -->
        <div class="history-row header">
          <div>Событие</div>
          <div>Пользователь</div>
          <div>Дата</div>
        </div>

        <!-- События -->
        <div
          v-for="(event, index) in group.events"
          :key="index"
          :class="['history-row', index % 2 === 0 ? 'white' : 'gray']"
        >
          <div>{{ event.event }}</div>
          <div>{{ getUserName(event.user) }}</div>
          <div>{{ event.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Рецензенты */
.reviewer-row {
  font-family: var(--font-Biryani);
  font-size: var(--size-nm);
  font-weight: var(--normal-weight);

  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--primary-gray-two);
}

/*Фильтры*/
.filters-block {
  margin-top: 0px;
}

/* История */
/* Блок версии */
.version-block {
  margin-bottom: var(--spacing-bg);
}
</style>
