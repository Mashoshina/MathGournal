<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import ManuscriptsSearchBar from '@/components/editor/manuscripts/ManuscriptsSearchBar.vue'
import ManuscriptsFilters from '@/components/editor/manuscripts/ManuscriptsFilters.vue'
import ManuscriptsContainer from '@/components/editor/manuscripts/ManuscriptsContainer.vue'

const manuscripts = ref([])
const authors = ref([])
const redactors = ref([])

onMounted(async () => {
  const [manuscriptsRes, authorsRes, redactorsRes] = await Promise.all([
    axios.get('http://localhost:3001/manuscripts'),
    axios.get('http://localhost:3001/authors'),
    axios.get('http://localhost:3001/redactors'),
  ])

  manuscripts.value = manuscriptsRes.data
  authors.value = authorsRes.data
  redactors.value = redactorsRes.data
})
</script>

<template>
  <div class="manuscripts-page">
    <ManuscriptsSearchBar />
    <ManuscriptsFilters />
    <ManuscriptsContainer :manuscripts="manuscripts" :authors="authors" :redactors="redactors" />
  </div>
</template>

<style scoped>
.manuscripts-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
