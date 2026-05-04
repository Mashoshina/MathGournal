<script setup>
defineProps({
  files: Array,
  activeFile: String,
})
</script>

<template>
  <div class="pdf-container">
    <iframe v-if="activeFile" :src="activeFile" class="pdf-frame" />
  </div>
</template>

<style scoped>
.pdf-container {
  width: 100%;
  height: 800px;
}

.pdf-frame {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
