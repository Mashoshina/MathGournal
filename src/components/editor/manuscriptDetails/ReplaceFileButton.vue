<script setup>
import { ref } from 'vue'
import axios from 'axios'
import VueFeather from 'vue-feather'

const props = defineProps({
  index: Number,
  manuscript: Object,
})

const fileInput = ref(null)

const openFileDialog = () => {
  fileInput.value.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const newPath = `./public/manuscripts/${file.name}`

  const files = [...props.manuscript.manuscriptFiles]
  files[props.index] = newPath

  await axios.patch(`http://localhost:3001/manuscripts/${props.manuscript.id}`, {
    manuscriptFiles: files,
    version: props.manuscript.version + 1,
  })

  location.reload()
}
</script>

<template>
  <button class="general-button editor" @click="openFileDialog">
    Изменить файл
    <vue-feather type="edit-3" size="20" />
  </button>
  <input ref="fileInput" type="file" hidden @change="handleFileChange" />
</template>
