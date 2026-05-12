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
    <div class="text-blocks">
      <div class="title Lora-family big">Авторы</div>

      <ul v-for="author in authors" :key="author.id" class="section-text">
        <li v-for="author in authors" :key="author.id">{{ author.name }}: {{ author.mail }}</li>
      </ul>
    </div>

    <!-- ФАЙЛЫ -->
    <div class="text-blocks">
      <div class="title Lora-family big">Файлы</div>
      <ul class="section-text">
        <li v-for="file in files" :key="file">
          <a href="#" @click.prevent="$emit('select-file', file)" class="materials-block main">
            {{ file.split('/').pop() }}
          </a>
        </li>
      </ul>
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
