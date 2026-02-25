<script setup>
import ManuscriptCard from './ManuscriptCard.vue'

defineProps({
  manuscripts: Array,
  authors: Array,
  redactors: Array,
})
</script>

<template>
  <div class="container">
    <ManuscriptCard
      v-for="manuscript in manuscripts"
      :key="manuscript.id"
      :manuscript="manuscript"
      :authors="authors"
      :redactors="redactors"
    />
  </div>
</template>

<style scoped>
.container {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;

  max-height: 500px;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
