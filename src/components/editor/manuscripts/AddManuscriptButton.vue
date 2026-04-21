<script setup>
const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<template>
  <button class="bright-button editor" @click="handleClick">Добавить рукопись +</button>
</template>
