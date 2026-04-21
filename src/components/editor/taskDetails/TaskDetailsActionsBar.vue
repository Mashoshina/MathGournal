<script setup>
const { activeTab } = defineProps({
  activeTab: String,
})

const emit = defineEmits(['change-tab'])

const setTab = (tab) => {
  emit('change-tab', tab)
}
</script>

<template>
  <div class="actions-bar">
    <div class="filters">
      <button
        class="filter"
        :class="{ active: activeTab === 'overview' }"
        @click="setTab('overview')"
      >
        Обзор
      </button>

      <button
        class="filter"
        :class="{ active: activeTab === 'reviewerss' }"
        @click="setTab('reviewerss')"
      >
        Рецензенты
      </button>

      <button
        class="filter"
        :class="{ active: activeTab === 'history' }"
        @click="setTab('history')"
      >
        История
      </button>
    </div>
  </div>
</template>

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
  flex: 1;
  background: none;
  border: none;
  font-family: 'Biryani', sans-serif;
  font-size: 16px;
  padding: 12px 0;
  cursor: pointer;
  position: relative;
  text-align: center;
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
