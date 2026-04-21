<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['search'])

const searchQuery = ref('')

watch(searchQuery, (value) => {
  emit('search', value)
})
</script>

<template>
  <div class="section-name">Поиск рукописей</div>
  <input
    v-model="searchQuery"
    class="search-input-big"
    type="text"
    placeholder="Поиск рукописей по названию, имени автора, id"
  />
</template>
