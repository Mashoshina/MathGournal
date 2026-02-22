<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import TasksActionsBar from '../components/tasks/TasksActionsBar.vue'
import TasksContainer from '../components/tasks/TasksContainer.vue'

const tasks = ref([])
const manuscripts = ref([])
const authors = ref([])
const reviewers = ref([])
const reviews = ref([])

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
</script>

<template>
  <div>
    <TasksActionsBar />
    <TasksContainer
      :tasks="tasks"
      :manuscripts="manuscripts"
      :authors="authors"
      :reviewers="reviewers"
      :reviews="reviews"
    />
  </div>
</template>
