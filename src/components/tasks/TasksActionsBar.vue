<template>
  <div class="actions-bar">
    <div class="filters">
      <button class="filter active">Посмотреть все</button>
      <button class="filter">Оценить отзывы рецензентов</button>
      <button class="filter">Найти и пригласить рецензентов</button>
    </div>

    <SortDropdown />
  </div>
</template>

<script setup>
import SortDropdown from './SortDropdown.vue'
</script>

<style scoped>
.actions-bar {
  margin-bottom: 30px;
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
