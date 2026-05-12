<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'

const emit = defineEmits(['change'])

const isOpen = ref(false)
const selected = ref('month')

const customFrom = ref('')
const customTo = ref('')

const options = [
  { label: 'Последний месяц', value: 'month' },
  { label: 'Последние 3 месяца', value: '3months' },
  { label: 'Последний год', value: 'year' },
  { label: 'Выбрать период', value: 'custom' },
]

const selectOption = (value) => {
  selected.value = value

  if (value !== 'custom') {
    emit('change', { type: value })
    isOpen.value = false
  }
}

const applyCustom = () => {
  emit('change', {
    type: 'custom',
    from: customFrom.value,
    to: customTo.value,
  })
  isOpen.value = false
}
</script>

<template>
  <div class="sort-wrapper">
    <div class="sort-btn" @click="isOpen = !isOpen" style="margin-top: var(--spacing-md)">
      Фильтр по дате
      <vue-feather
        type="chevron-down"
        size="20"
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }"
      />
    </div>

    <div v-if="isOpen" class="dropdown">
      <div v-for="opt in options" :key="opt.value" class="option" @click="selectOption(opt.value)">
        <input type="radio" :checked="selected === opt.value" />
        {{ opt.label }}
      </div>

      <!-- кастомный период -->
      <div v-if="selected === 'custom'" style="margin-top: 10px">
        <input type="date" v-model="customFrom" class="input" />
        <input type="date" v-model="customTo" class="input" style="margin-top: 6px" />

        <div class="bright-button editor" @click="applyCustom">Применить</div>
      </div>
    </div>
  </div>
</template>
