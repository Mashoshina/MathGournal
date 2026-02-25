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

<style scoped>
.sort-wrapper {
  position: relative;
  display: inline-block;
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 16px;

  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 8px;

  font-family: 'Biryani', sans-serif;
  font-size: 16px;
  color: #000;

  cursor: pointer;

  /* внешняя тень */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  transition: all 0.2s ease;
}

/* Hover — эффект объёма внутрь снизу */
.sort-btn:hover {
  box-shadow:
    inset 0 -4px 6px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.08);
}

/* Активное нажатие */
.sort-btn:active {
  transform: translateY(1px);
}

.sort-wrapper {
  position: relative;
  display: inline-block;
}

.dropdown {
  position: absolute;
  top: 110%;
  left: 0;

  display: flex;
  flex-direction: column;

  background: white;
  border: 1px solid #000000;
  border-radius: 6px;

  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);

  padding: 8px 12px;
  min-width: 200px;
  z-index: 10;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 6px 0;
  cursor: pointer;
}

.option + .option {
  margin-top: 6px;
}
</style>
