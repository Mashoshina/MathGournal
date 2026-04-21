<script setup>
const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>

<template>
  <div class="overlay">
    <div class="search-modal">
      <div class="modal-header">
        <div class="section-name">Добавить рукопись</div>
        <span class="close-btn" @click="closeModal">✕</span>
      </div>

      <slot />
    </div>
  </div>
</template>
