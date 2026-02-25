<script setup>
import { computed } from 'vue'

const props = defineProps({
  manuscript: Object,
  authors: Array,
  redactors: Array,
})

const author = computed(() => {
  return props.authors.find((a) => a.authorsId === props.manuscript.authorsId?.[0])
})

const redactor = computed(() => {
  if (!props.manuscript.redactorsId?.length) return null
  return props.redactors.find((r) => r.redactorsId === props.manuscript.redactorsId[0])
})
</script>

<template>
  <div class="card">
    <!-- Акцентный заголовок -->
    <div class="card-header">
      <span>{{ manuscript.stage }}</span>
      <span>
        {{ redactor ? redactor.name : 'Без редактора' }}
      </span>
      <span>Подана: {{ manuscript.sentDate }}</span>
    </div>

    <!-- Тело карточки -->
    <div class="card-body">
      <h3 class="title">
        {{ manuscript.title }}
      </h3>

      <div v-if="manuscript.stage === 'Опубликовано'">
        Версия 1 | Дата публикации: {{ manuscript.sentDate }}
      </div>

      <div>
        Автор:
        {{ author?.name }} | {{ author?.mail }}
      </div>

      <div>
        Редактор:
        {{ redactor?.name || '—' }} | {{ redactor?.mail || '—' }}
      </div>

      <div>
        {{ manuscript.collection || 'Без сборника' }} |
        {{ manuscript.chapter }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  padding: 16px;
  background: white;
}

.card-header {
  background: #f3f3f3;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}

.title {
  color: #810e17;
  cursor: pointer;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}
</style>
