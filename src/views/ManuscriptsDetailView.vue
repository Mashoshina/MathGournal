<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import ManuscriptDetailsContainer from '@/components/editor/manuscriptDetails/ManuscriptDetailsContainer.vue'

const route = useRoute()

const manuscript = ref(null)
const authors = ref([])
const redactors = ref([])
const reviews = ref([])
const reviewers = ref([])

onMounted(async () => {
  const [manuscriptsRes, authorsRes, redactorsRes, reviewsRes, reviewersRes] = await Promise.all([
    axios.get('http://localhost:3001/manuscripts'),
    axios.get('http://localhost:3001/authors'),
    axios.get('http://localhost:3001/redactors'),
    axios.get('http://localhost:3001/reviews'),
    axios.get('http://localhost:3001/reviewers'),
  ])

  const id = route.params.id

  manuscript.value = manuscriptsRes.data.find((m) => m.id === id)

  authors.value = authorsRes.data
  redactors.value = redactorsRes.data
  reviews.value = reviewsRes.data
  reviewers.value = reviewersRes.data
})
</script>

<template>
  <div v-if="manuscript" style="padding: var(--spacing-sm) var(--spacing-lg)">
    <div class="details-header">
      <!-- Первая строка -->
      <div class="details-status">{{ manuscript.stage }}</div>

      <!-- Название -->
      <div class="details-title">
        {{ manuscript.title }}
      </div>

      <!-- Версия и дата -->
      <div class="details-version-date">
        <span class="version-badge"> Версия {{ manuscript.version }} </span>
        <span> Рукопись подана: {{ manuscript.sentDate }}</span>
      </div>
    </div>
    <ManuscriptDetailsContainer
      :manuscript="manuscript"
      :authors="authors"
      :redactors="redactors"
      :reviews="reviews"
      :reviewers="reviewers"
    />
  </div>
</template>
