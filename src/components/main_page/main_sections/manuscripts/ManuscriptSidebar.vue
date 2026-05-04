<script setup>
defineProps({
  authors: Array,
  files: Array,
})

defineEmits(['select-file'])
</script>

<template>
  <div class="sidebar">
    <!-- АВТОРЫ -->
    <div class="block">
      <div class="section-name">Авторы</div>

      <div v-for="author in authors" :key="author.id" class="section-text">
        {{ author.name }}
      </div>
    </div>

    <!-- ФАЙЛЫ -->
    <div class="block">
      <div class="section-name">Файлы</div>

      <div v-for="file in files" :key="file" class="file" @click="$emit('select-file', file)">
        {{ file.split('/').pop() }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.title {
  font-weight: 600;
  margin-bottom: 8px;
}

.file {
  margin-top: 16px;
  font-family: var(--font-Biryani);
  font-size: var(--size-nm);
  color: var(--purple-main);
  cursor: pointer;
}

.file:hover {
  text-decoration: underline;
}
</style>
