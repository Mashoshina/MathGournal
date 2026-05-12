<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

/* ======================
  Добавление рукописей
======================= */
import AddManuscriptButton from '@/components/editor/manuscripts/AddManuscriptButton.vue'
import AddManuscriptModal from '@/components/editor/manuscripts/AddManuscriptModal.vue'
import AddManuscriptForm from '@/components/editor/manuscripts/AddManuscriptForm.vue'

import ManuscriptsSearchBar from '@/components/editor/manuscripts/ManuscriptsSearchBar.vue'
import ManuscriptsFilters from '@/components/editor/manuscripts/ManuscriptFilters.vue'
import ManuscriptsContainer from '@/components/editor/manuscripts/ManuscriptsContainer.vue'

const manuscripts = ref([])
const authors = ref([])
const redactors = ref([])

const searchQuery = ref('')

const statusFilter = ref('all')

const editorFilter = ref({
  mode: 'all',
  editors: [],
})

const showModal = ref(false)

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

/* =========================
   Фильтрация рукописей
========================= */

const filteredManuscripts = computed(() => {
  let result = manuscripts.value

  /* =====================
     ПОИСК
  ===================== */

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()

    result = result.filter((m) => {
      // поиск по id
      const idMatch = String(m.manuscriptId).includes(query)

      // поиск по названию
      const titleMatch = m.title.toLowerCase().includes(query)

      // поиск по авторам
      const authorsMatch = m.authorsId?.some((authorId) => {
        const author = authors.value.find((a) => a.authorsId === authorId)
        return author?.name.toLowerCase().includes(query)
      })

      return idMatch || titleMatch || authorsMatch
    })
  }

  /* =====================
     ФИЛЬТР СТАТУСА
  ===================== */

  if (statusFilter.value !== 'all') {
    result = result.filter((m) => m.stage === statusFilter.value)
  }

  /* =====================
     ФИЛЬТР РЕДАКТОРА
  ===================== */

  const mode = editorFilter.value.mode

  if (mode === 'none') {
    result = result.filter((m) => !m.redactorsId || m.redactorsId.length === 0)
  }

  if (mode === 'mine') {
    const currentEditorId = 1

    result = result.filter((m) => m.redactorsId?.includes(currentEditorId))
  }

  if (mode === 'by_name') {
    result = result.filter((m) =>
      m.redactorsId?.some((id) => editorFilter.value.editors.includes(id)),
    )
  }

  return result
})
</script>

<template>
  <div class="manuscripts-page">
    <AddManuscriptButton @click="showModal = true" />

    <AddManuscriptModal v-if="showModal" @close="showModal = false">
      <AddManuscriptForm
        :authors="authors"
        :redactors="redactors"
        @saved="
          () => {
            showModal = false
            reloadManuscripts()
          }
        "
      />
    </AddManuscriptModal>

    <ManuscriptsSearchBar @search="searchQuery = $event" />

    <ManuscriptsFilters
      :status="statusFilter"
      :editorFilter="editorFilter"
      :editors="redactors"
      @change-status="statusFilter = $event"
      @change-editor-filter="editorFilter = $event"
    />

    <ManuscriptsContainer
      :manuscripts="filteredManuscripts"
      :authors="authors"
      :redactors="redactors"
    />
  </div>
</template>

<style scoped>
.manuscripts-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
