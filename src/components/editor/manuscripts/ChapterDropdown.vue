<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'

defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

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

function toggle() {
  isOpen.value = !isOpen.value
}

function select(chapter) {
  emit('update:modelValue', chapter)
  isOpen.value = false
}
</script>

<template>
  <div class="sort-wrapper">
    <!-- Кнопка -->
    <button class="sort-btn" @click="toggle">
      {{ modelValue || 'Выберите раздел*' }}

      <vue-feather
        type="chevron-down"
        size="20"
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }"
      />
    </button>

    <!-- Выпадающий список -->
    <div v-if="isOpen" class="dropdown">
      <label v-for="chapter in chapters" :key="chapter" class="option">
        <input
          type="radio"
          :value="chapter"
          :checked="modelValue === chapter"
          @change="select(chapter)"
        />
        {{ chapter }}
      </label>
    </div>
  </div>
</template>
