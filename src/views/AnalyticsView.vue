<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import AnalyticsContainer from '@/components/editor/analytics/AnalyticsContainer.vue'

const tasks = ref([])
const manuscripts = ref([])
const reviewers = ref([])
const redactors = ref([])

onMounted(async () => {
  const [tasksRes, manuscriptsRes, reviewersRes, redactorsRes] = await Promise.all([
    axios.get('http://localhost:3001/tasks'),
    axios.get('http://localhost:3001/manuscripts'),
    axios.get('http://localhost:3001/reviewers'),
    axios.get('http://localhost:3001/redactors'),
  ])

  tasks.value = tasksRes.data
  manuscripts.value = manuscriptsRes.data
  reviewers.value = reviewersRes.data
  redactors.value = redactorsRes.data
})
</script>

<template>
  <div>
    <AnalyticsContainer
      :tasks="tasks"
      :manuscripts="manuscripts"
      :reviewers="reviewers"
      :redactors="redactors"
    />
  </div>
</template>
