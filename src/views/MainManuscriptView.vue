<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import ManuscriptPdfViewer from '@/components/main_page/main_sections/manuscripts/ManuscriptPdfViewer.vue'
import ManuscriptSidebar from '@/components/main_page/main_sections/manuscripts/ManuscriptSidebar.vue'
import ManuscriptActions from '@/components/main_page/main_sections/manuscripts/ManuscriptActions.vue'

const route = useRoute()

const manuscript = ref(null)
const authors = ref([])
const activeFile = ref(null)

onMounted(async () => {
  const [manuscriptsRes, authorsRes] = await Promise.all([
    axios.get('http://localhost:3001/manuscripts'),
    axios.get('http://localhost:3001/authors'),
  ])

  const id = Number(route.params.id)

  manuscript.value = manuscriptsRes.data.find((m) => m.manuscriptId === id)

  if (manuscript.value) {
    authors.value = authorsRes.data.filter((a) => manuscript.value.authorsId.includes(a.authorsId))

    activeFile.value = manuscript.value.manuscriptFiles?.[0]
  }
})
</script>

<template>
  <div v-if="manuscript" class="manuscript-page">
    <div class="details-title">
      {{ manuscript.title }}
    </div>

    <ManuscriptActions />

    <div class="layout">
      <ManuscriptPdfViewer :files="manuscript.manuscriptFiles" :activeFile="activeFile" />

      <ManuscriptSidebar
        :authors="authors"
        :files="manuscript.manuscriptFiles"
        @select-file="activeFile = $event"
      />
    </div>
  </div>
</template>

<style scoped>
.manuscript-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.layout {
  display: flex;
  gap: 32px;
}
</style>
