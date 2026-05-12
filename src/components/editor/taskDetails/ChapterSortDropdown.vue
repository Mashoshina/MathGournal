<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'

defineProps({
  chapterFilter: String,
})

const emit = defineEmits(['change-filter'])

const isOpen = ref(false)

const chapters = [
  'Математика',
  'Механика',
  'Физика',
  'Астрономия',
  'Информатика, вычислительная техника и управление',
  'Математическое моделирование',
  'Динамика многофазных сред',
  'Поздравительные статьи',
]

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (value) => {
  emit('change-filter', value)
  isOpen.value = false
}
</script>

<template>
  <div class="sort-wrapper">
    <button class="sort-btn" @click="toggle">
      Направление:
      {{ chapterFilter === 'all' ? 'Любое' : chapterFilter }}

      <vue-feather
        type="chevron-down"
        size="20"
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }"
      />
    </button>

    <div v-if="isOpen" class="dropdown">
      <!-- Любое -->
      <label class="option">
        <input
          type="radio"
          value="all"
          :checked="chapterFilter === 'all'"
          @change="selectOption('all')"
        />
        Любое
      </label>

      <!-- Разделы -->
      <label v-for="chapter in chapters" :key="chapter" class="option">
        <input
          type="radio"
          :value="chapter"
          :checked="chapterFilter === chapter"
          @change="selectOption(chapter)"
        />

        {{ chapter }}
      </label>
    </div>
  </div>
</template>
