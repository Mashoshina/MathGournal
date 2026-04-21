<script setup>
import VueFeather from 'vue-feather'

const emit = defineEmits(['open'])
</script>

<template>
  <button class="general-button editor" @click="emit('open')">
    Изменить редакторов
    <vue-feather type="edit-3" size="20" />
  </button>
</template>
