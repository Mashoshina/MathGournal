<script setup>
import { computed } from 'vue'

const props = defineProps({
  tasks: Array,
  manuscripts: Array,
  reviewers: Array,
  redactors: Array,
})

const manuscriptsCount = computed(() => props.manuscripts.length)
const tasksCount = computed(() => props.tasks.length)
const reviewersCount = computed(() => props.reviewers.length)
const redactorsCount = computed(() => props.redactors.length)
</script>

<template>
  <div class="analytics-container">
    <div class="stat-card">
      <div class="stat-title">Рукописи</div>
      <div class="stat-value">{{ manuscriptsCount }}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Задачи</div>
      <div class="stat-value">{{ tasksCount }}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Рецензенты</div>
      <div class="stat-value">{{ reviewersCount }}</div>
    </div>

    <div class="stat-card">
      <div class="stat-title">Редакторы</div>
      <div class="stat-value">{{ redactorsCount }}</div>
    </div>
  </div>
</template>

<style scoped>
.analytics-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 20px;

  background: white;

  box-shadow:
    inset 0 -4px 6px rgba(0, 0, 0, 0.05),
    0 2px 6px rgba(0, 0, 0, 0.05);
}

.stat-title {
  font-family: 'Biryani', sans-serif;
  font-size: 14px;
}

.stat-value {
  margin-top: 10px;
  font-family: 'Lora', serif;
  font-size: 28px;
  font-weight: 600;
}
</style>
