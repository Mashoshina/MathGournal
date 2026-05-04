<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import VueFeather from 'vue-feather'

const releases = ref([])
const volumes = ref([])
const manuscripts = ref([])
const authors = ref([])

/* --- загрузка данных --- */
onMounted(async () => {
  const [releasesRes, volumesRes, manuscriptsRes, authorsRes] = await Promise.all([
    axios.get('http://localhost:3001/releases'),
    axios.get('http://localhost:3001/volumes'),
    axios.get('http://localhost:3001/manuscripts'),
    axios.get('http://localhost:3001/authors'),
  ])

  releases.value = releasesRes.data
  volumes.value = volumesRes.data
  manuscripts.value = manuscriptsRes.data
  authors.value = authorsRes.data
})
/* --- текущий выпуск --- */
const currentRelease = computed(() => {
  if (!releases.value.length) return null
  return releases.value[releases.value.length - 1]
})

/* --- текущий том --- */
const currentVolume = computed(() => {
  if (!currentRelease.value) return null

  const volId = currentRelease.value.volumes[0]
  return volumes.value.find((v) => v.volId === volId)
})

/* --- рукописи текущего тома --- */
const volumeManuscripts = computed(() => {
  if (!currentVolume.value) return []

  return currentVolume.value.manuscripts
    .map((id) => manuscripts.value.find((m) => m.manuscriptId === id))
    .filter(Boolean)
})

/* --- группировка --- */
const grouped = computed(() => {
  const g = {}

  volumeManuscripts.value.forEach((m) => {
    if (!g[m.chapter]) g[m.chapter] = []
    g[m.chapter].push(m)
  })

  return g
})

/* --- авторы --- */
const getAuthors = (ids) => {
  return ids
    .map((id) => authors.value.find((a) => a.authorsId === id)?.name)
    .filter(Boolean)
    .join(', ')
}
</script>

<template>
  <div v-if="currentRelease && currentVolume">
    <!-- ВЫПУСК -->
    <div class="release-header">
      <img src="/Обложка.jpg" class="release-cover" />

      <div class="release-info">
        <div class="release-title">Текущий выпуск</div>

        <div class="release-title">
          {{ currentRelease.year }} | Том
          {{ currentRelease.volumes.indexOf(currentVolume.volId) + 1 }}
        </div>

        <div v-if="currentVolume.collection">
          {{ currentVolume.collection }}
        </div>

        <button class="general-button main">Посмотреть все тома →</button>
      </div>
    </div>

    <!-- СТАТЬИ -->
    <div v-for="(group, chapter) in grouped" :key="chapter" class="section-name">
      <h>{{ chapter }}</h>

      <div v-for="(m, i) in group" :key="m.id">
        <div>
          {{ i + 1 }}.
          <router-link :to="`/manuscripts/view/${m.manuscriptId}`" class="section-name">
            {{ m.title }}
          </router-link>
        </div>

        <div class="section-text">
          {{ getAuthors(m.authorsId) }}
        </div>

        <div>
          <button class="general-button main">
            Скачать <vue-feather type="download" size="20" />
          </button>
          <button class="general-button main">
            Сохранить <vue-feather type="bookmark" size="20" />
          </button>
        </div>

        <hr />
      </div>
    </div>
  </div>

  <div v-else>Загрузка...</div>
</template>

<style scoped>
/* --- HEADER ВЫПУСКА --- */
.release-header {
  display: flex;
  gap: var(--spacing-40);
  align-items: flex-start;
  margin-bottom: var(--spacing-40);
}

.release-cover {
  width: 180px;
  height: auto;
  border-radius: var(--radius-md);
  border: var(--strock-sm) solid var(--purple-main);
}

.release-info {
  font-family: var(--font-Biryani);
  font-size: var(--size-bg);
  font-weight: var(--normal-weight);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.release-title {
  font-family: var(--font-Lora);
  font-size: var(--size-lg);
  font-weight: var(--bold-weight);
}

/* --- РАЗДЕЛЫ --- */
.chapter-block {
  margin-top: 24px;
}

.chapter-title {
  font-family: var(--font-Lora);
  font-size: var(--size-bg);
  font-weight: var(--medium-weight);
  margin-bottom: 12px;
}

/* --- РАЗДЕЛИТЕЛЬ --- */
.divider-line {
  height: 1px;
  background: var(--primary-gray-two);
  margin-top: 12px;
}
</style>
