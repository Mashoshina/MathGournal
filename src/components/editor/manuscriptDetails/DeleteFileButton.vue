<script setup>
import VueFeather from 'vue-feather'

const props = defineProps({
  index: Number,
})

const emit = defineEmits(['ask-delete'])

const handleClick = () => {
  emit('ask-delete', props.index)
}
</script>

<template>
  <button class="general-button editor" @click="handleClick">
    Удалить файл <vue-feather type="trash-2" size="20" />
  </button>
</template>
