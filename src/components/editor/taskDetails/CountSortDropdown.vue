<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'

defineProps({
  countFilter: String,
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
      Работы:
      {{
        countFilter === 'all'
          ? 'Все'
          : countFilter === 'lt10'
            ? 'Менее 10'
            : countFilter === '10-50'
              ? '10-50'
              : countFilter === '50-100'
                ? '50-100'
                : 'Более 100'
      }}

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
          :checked="countFilter === 'all'"
          @change="selectOption('all')"
        />
        Все
      </label>

      <label class="option">
        <input
          type="radio"
          value="lt10"
          :checked="countFilter === 'lt10'"
          @change="selectOption('lt10')"
        />
        Менее 10
      </label>

      <label class="option">
        <input
          type="radio"
          value="10-50"
          :checked="countFilter === '10-50'"
          @change="selectOption('10-50')"
        />
        10-50
      </label>

      <label class="option">
        <input
          type="radio"
          value="50-100"
          :checked="countFilter === '50-100'"
          @change="selectOption('50-100')"
        />
        50-100
      </label>

      <label class="option">
        <input
          type="radio"
          value="gt100"
          :checked="countFilter === 'gt100'"
          @change="selectOption('gt100')"
        />
        Более 100
      </label>
    </div>
  </div>
</template>
