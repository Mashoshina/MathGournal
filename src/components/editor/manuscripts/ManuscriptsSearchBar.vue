<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['search'])

const searchQuery = ref('')

watch(searchQuery, (value) => {
  emit('search', value)
})
</script>

<template>
  <div class="text-blocks"><div class="section-name big">Поиск рукописей</div></div>
  <input
    v-model="searchQuery"
    class="search-input-small"
    type="text"
    placeholder="Поиск рукописей по названию, имени автора, id"
  />
</template>
