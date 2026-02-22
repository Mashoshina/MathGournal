<script setup>
import VueFeather from 'vue-feather'
</script>

<template>
  <div class="sort-wrapper">
    <button class="sort-btn">
      Сначала новые
      <vue-feather type="chevron-down" size="24" />
    </button>
  </div>
</template>

<style scoped>
.sort-wrapper {
  position: relative;
}

.sort-btn {
  background: none;
  border: none;
  font-family: 'Biryani', sans-serif;
  font-size: 16px;
  cursor: pointer;
}
</style>
