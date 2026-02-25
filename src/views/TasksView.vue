<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

import TasksActionsBar from '@/components/editor/tasks/TasksActionsBar.vue'
import TasksContainer from '@/components/editor/tasks/TasksContainer.vue'

const tasks = ref([])
const manuscripts = ref([])
const authors = ref([])
const reviewers = ref([])
const reviews = ref([])

const activeFilter = ref('all')

onMounted(async () => {
  const [tasksRes, manuscriptsRes, authorsRes, reviewersRes, reviewsRes] = await Promise.all([
    axios.get('http://localhost:3001/tasks'),
    axios.get('http://localhost:3001/manuscripts'),
    axios.get('http://localhost:3001/authors'),
    axios.get('http://localhost:3001/reviewers'),
    axios.get('http://localhost:3001/reviews'),
  ])

  tasks.value = tasksRes.data
  manuscripts.value = manuscriptsRes.data
  authors.value = authorsRes.data
  reviewers.value = reviewersRes.data
  reviews.value = reviewsRes.data
})
const sortOrder = ref('new') // new | old

const filteredTasks = computed(() => {
  let result = tasks.value

  // 1. фильтр по типу
  if (activeFilter.value !== 'all') {
    result = result.filter((task) => task.type === activeFilter.value)
  }

  // 2. сортировка по дате создания
  result = [...result].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)

    return sortOrder.value === 'new' ? dateB - dateA : dateA - dateB
  })

  return result
})

const setFilter = (filter) => {
  activeFilter.value = filter
}

const setSortOrder = (order) => {
  sortOrder.value = order
}
</script>

<template>
  <div>
    <TasksActionsBar
      :activeFilter="activeFilter"
      :sortOrder="sortOrder"
      @change-filter="setFilter"
      @change-sort="setSortOrder"
    />

    <TasksContainer
      :tasks="filteredTasks"
      :manuscripts="manuscripts"
      :authors="authors"
      :reviewers="reviewers"
      :reviews="reviews"
    />
  </div>
</template>
