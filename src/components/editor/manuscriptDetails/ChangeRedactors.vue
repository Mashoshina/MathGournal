<script setup>
const emit = defineEmits(['open'])
</script>

<template>
  <button class="general-button editor" @click="emit('open')">Изменить список редакторов</button>
</template>
