<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import TaskDetailsActionsBar from '@/components/editor/taskDetails/TaskDetailsActionsBar.vue'
import TaskDetailsContainer from '@/components/editor/taskDetails/TaskDetailsContainer.vue'

const route = useRoute()
/*const taskId = Number(route.params.id)*/

const task = ref(null)
const manuscript = ref(null)
const authors = ref([])
const reviewers = ref([])
const reviews = ref([])
const users = ref([])

const activeTab = ref('overview')

onMounted(async () => {
  const [tasksRes, manuscriptsRes, authorsRes, reviewersRes, reviewsRes] = await Promise.all([
    axios.get('http://localhost:3001/tasks'),
    axios.get('http://localhost:3001/manuscripts'),
    axios.get('http://localhost:3001/authors'),
    axios.get('http://localhost:3001/reviewers'),
    axios.get('http://localhost:3001/reviews'),
    axios.get('http://localhost:3001/users'),
  ])

  const taskId = route.params.id

  task.value = tasksRes.data.find((t) => Number(t.id) === Number(taskId))

  if (task.value) {
    manuscript.value = manuscriptsRes.data.find(
      (m) => Number(m.id) === Number(task.value.manuscriptId),
    )
  }

  authors.value = authorsRes.data
  reviewers.value = reviewersRes.data
  reviews.value = reviewsRes.data
})

const setTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <div v-if="task && manuscript" style="padding: var(--spacing-sm) var(--spacing-lg)">
    <div class="details-header">
      <!-- Первая строка -->
      <div class="details-status">
        <span>{{ task.type }}</span>
        <span>{{ task.stage }}</span>
        <span>{{ task.createdAt }}</span>
      </div>

      <!-- Название -->
      <div class="details-title">
        {{ manuscript.title }}
      </div>

      <!-- Версия и дата -->
      <div class="details-version-date">
        <span class="version-badge"> Версия {{ manuscript.version }} </span>
        <span> Рукопись подана: {{ manuscript.sentDate }} </span>
      </div>
    </div>

    <TaskDetailsActionsBar :activeTab="activeTab" @change-tab="setTab" />

    <TaskDetailsContainer
      :activeTab="activeTab"
      :task="task"
      :manuscript="manuscript"
      :authors="authors"
      :reviewers="reviewers"
      :reviews="reviews"
      :users="users"
    />
  </div>
</template>
