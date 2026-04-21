<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'

defineProps({
  chapterFilter: String,
})

const emit = defineEmits(['change-filter'])

const isOpen = ref(false)

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
      <label class="option">
        <input
          type="radio"
          value="all"
          :checked="chapterFilter === 'all'"
          @change="selectOption('all')"
        />
        Любое
      </label>

      <label class="option">
        <input type="radio" value="Математика" @change="selectOption('Математика')" />
        Математика
      </label>

      <label class="option">
        <input type="radio" value="Механика" @change="selectOption('Механика')" />
        Механика
      </label>

      <label class="option">
        <input type="radio" value="Физика" @change="selectOption('Физика')" />
        Физика
      </label>

      <label class="option">
        <input type="radio" value="Астрономия" @change="selectOption('Астрономия')" />
        Астрономия
      </label>

      <label class="option">
        <input
          type="radio"
          value="Информатика, вычислительная техника и управление"
          @change="selectOption('Информатика, вычислительная техника и управление')"
        />
        Информатика, вычислительная техника и управление
      </label>

      <label class="option">
        <input
          type="radio"
          value="Математическое моделирование"
          @change="selectOption('Математическое моделирование')"
        />
        Математическое моделирование
      </label>

      <label class="option">
        <input
          type="radio"
          value="Динамика многофазных сред"
          @change="selectOption('Динамика многофазных сред')"
        />
        Динамика многофазных сред
      </label>
    </div>
  </div>
</template>
