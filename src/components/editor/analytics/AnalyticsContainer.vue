<script setup>
import DateFilter from './dateFilter.vue'
import { ref, computed } from 'vue'

const props = defineProps({
  tasks: Array,
  manuscripts: Array,
  reviewers: Array,
  redactors: Array,
})

const dateFilter = ref({ type: 'month' })

const handleDateChange = (filter) => {
  dateFilter.value = filter
}

/* Расчёт дат для фильтра */
const filteredManuscripts = computed(() => {
  const now = new Date()

  return props.manuscripts.filter((m) => {
    const date = new Date(m.sentDate)

    if (dateFilter.value.type === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(now.getMonth() - 1)
      return date >= monthAgo
    }

    if (dateFilter.value.type === '3months') {
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(now.getMonth() - 3)
      return date >= threeMonthsAgo
    }

    if (dateFilter.value.type === 'year') {
      const yearAgo = new Date()
      yearAgo.setFullYear(now.getFullYear() - 1)
      return date >= yearAgo
    }

    if (dateFilter.value.type === 'custom') {
      const from = new Date(dateFilter.value.from)
      const to = new Date(dateFilter.value.to)
      return date >= from && date <= to
    }

    return true
  })
})

const myManuscriptsCount = computed(
  () => filteredManuscripts.value.filter((m) => m.redactorsId?.includes(1)).length,
)

const inProgressCount = computed(
  () => filteredManuscripts.value.filter((m) => m.stage === 'В процессе').length,
)

const declinedCount = computed(
  () => filteredManuscripts.value.filter((m) => m.stage === 'Отклонено').length,
)

const publishedCount = computed(
  () => filteredManuscripts.value.filter((m) => m.stage === 'Опубликовано').length,
)
</script>

<template>
  <div>
    <div class="section-name">Аналитика продуктивности</div>

    <DateFilter @change="handleDateChange" />

    <div class="analytics-container">
      <div class="stat-card">
        <div class="stat-title">Мои рукописи</div>
        <div class="stat-value">{{ myManuscriptsCount }}</div>
      </div>

      <div class="stat-card">
        <div class="stat-title">Принято</div>
        <div class="stat-value">{{ inProgressCount }}</div>
      </div>

      <div class="stat-card">
        <div class="stat-title">Отклонённые</div>
        <div class="stat-value">{{ declinedCount }}</div>
      </div>

      <div class="stat-card">
        <div class="stat-title">Опубликованные</div>
        <div class="stat-value">{{ publishedCount }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  border: 2px solid var(--red-editor);
  border-radius: var(--radius-md);
  padding: var(--spacing-bg);
  margin-top: var(--spacing-md);

  background: var(--white);

  box-shadow:
    inset 0 -4px 6px rgba(0, 0, 0, 0.05),
    0 2px 6px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  text-align: center;
}

.cards-block {
  margin-top: var(--spacing-md);
  justify-content: space-evenly;
  display: flex;
  flex-direction: grid;
  width: 100%;
}

.stat-title {
  font-family: var(--font-Biryani);
  font-size: var(--size-nm);
}

.stat-value {
  margin-top: var(--spacing-sm);
  font-family: 'Lora', serif;
  font-size: var(--size-lg);
  font-weight: var(--medium-weight);
}
</style>
