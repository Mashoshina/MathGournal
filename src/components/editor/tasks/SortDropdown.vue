<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'

const { sortOrder } = defineProps({
  sortOrder: String,
})

const emit = defineEmits(['change-sort'])

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (value) => {
  emit('change-sort', value)
  isOpen.value = false
}
</script>

<template>
  <div class="sort-wrapper">
    <button class="sort-btn" @click="toggle">
      {{ sortOrder === 'new' ? 'Сначала новые' : 'Сначала старые' }}

      <vue-feather
        type="chevron-down"
        size="20"
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }"
      />
    </button>

    <div v-if="isOpen" class="dropdown">
      <label class="option">
        <input
          type="radio"
          value="new"
          :checked="sortOrder === 'new'"
          @change="selectOption('new')"
        />
        Сначала новые
      </label>

      <label class="option">
        <input
          type="radio"
          value="old"
          :checked="sortOrder === 'old'"
          @change="selectOption('old')"
        />
        Сначала старые
      </label>
    </div>
  </div>
</template>
