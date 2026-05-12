<script setup>
import SortDropdown from './SortDropdown.vue'

const { activeFilter, sortOrder } = defineProps({
  activeFilter: String,
  sortOrder: String,
})

const emit = defineEmits(['change-filter', 'change-sort'])

const setFilter = (filter) => {
  emit('change-filter', filter)
}

const setSort = (order) => {
  emit('change-sort', order)
}
</script>

<template>
  <div class="actions-bar">
    <div class="filters">
      <button class="filter" :class="{ active: activeFilter === 'all' }" @click="setFilter('all')">
        Посмотреть все
      </button>

      <button
        class="filter"
        :class="{ active: activeFilter === 'Оценить отзывы рецензентов' }"
        @click="setFilter('Оценить отзывы рецензентов')"
      >
        Оценить отзывы рецензентов
      </button>

      <button
        class="filter"
        :class="{ active: activeFilter === 'Найти и пригласить рецензентов' }"
        @click="setFilter('Найти и пригласить рецензентов')"
      >
        Найти и пригласить рецензентов
      </button>
    </div>

    <SortDropdown :sortOrder="sortOrder" @change-sort="setSort" />
  </div>
</template>

<style scoped>
.actions-bar {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* расстояние между строками */
}

.filters {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}

.filter {
  flex: 1; /* одинаковая ширина */
  background: none;
  border: none;
  font-family: 'Biryani', sans-serif;
  font-size: 16px;
  padding: 12px 0;
  cursor: pointer;
  position: relative;
  text-align: center; /* текст по центру */
}

.filter.active {
  color: #810e17;
}

.filter:hover {
  color: #810e17;
}

.filter::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transition: 0.2s;
}

.filter:hover::after,
.filter.active::after {
  transform: scaleX(1);
}
</style>
