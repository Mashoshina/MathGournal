<script setup>
import axios from 'axios'

const props = defineProps({
  manuscript: Object,
})

const handleFileChange = async (event) => {
  const file = event.target.files[0]

  if (!file) return

  const newPath = `./public/manuscripts/${file.name}`

  const files = [...props.manuscript.manuscriptFiles, newPath]

  await axios.patch(`http://localhost:3001/manuscripts/${props.manuscript.id}`, {
    manuscriptFiles: files,
    version: props.manuscript.version + 1,
  })

  location.reload()
}
</script>

<template>
  <label class="general-button editor">
    Добавить файл
    <input type="file" style="display: none" @change="handleFileChange" />
  </label>
</template>
