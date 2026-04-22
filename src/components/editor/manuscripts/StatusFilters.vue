<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'

const { status } = defineProps({
  status: String,
})

const emit = defineEmits(['change-status'])

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const select = (value) => {
  emit('change-status', value)
  isOpen.value = false
}
</script>

<template>
  <div class="sort-wrapper">
    <button class="sort-btn" @click="toggle">
      {{ status === 'all' ? 'Все статусы' : status }}

      <vue-feather
        type="chevron-down"
        size="20"
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }"
      />
    </button>

    <div v-if="isOpen" class="dropdown">
      <label class="option">
        <input type="radio" value="all" :checked="status === 'all'" @change="select('all')" />
        Все
      </label>

      <label class="option">
        <input
          type="radio"
          value="В процессе"
          :checked="status === 'В процессе'"
          @change="select('В процессе')"
        />
        В процессе
      </label>

      <label class="option">
        <input
          type="radio"
          value="Опубликовано"
          :checked="status === 'Опубликовано'"
          @change="select('Опубликовано')"
        />
        Опубликовано
      </label>

      <label class="option">
        <input
          type="radio"
          value="Отклонено"
          :checked="status === 'Отклонено'"
          @change="select('Отклонено')"
        />
        Отклонено
      </label>
    </div>
  </div>
</template>
