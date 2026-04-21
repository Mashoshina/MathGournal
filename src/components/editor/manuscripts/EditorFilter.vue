<script setup>
import { ref, computed } from 'vue'
import VueFeather from 'vue-feather'

const props = defineProps({
  editors: Array,
  selectedEditors: Array,
  mode: String,
})

const emit = defineEmits(['change-editor-filter'])

const isOpen = ref(false)
const search = ref('')

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectMode = (value) => {
  emit('change-editor-filter', {
    mode: value,
    editors: [],
  })

  isOpen.value = false
}

const filteredEditors = computed(() => {
  if (!search.value) return props.editors

  return props.editors.filter((e) => e.name.toLowerCase().includes(search.value.toLowerCase()))
})

const toggleEditor = (id) => {
  const current = [...props.selectedEditors]

  if (current.includes(id)) {
    emit('change-editor-filter', {
      mode: 'by_name',
      editors: current.filter((e) => e !== id),
    })
  } else {
    current.push(id)

    emit('change-editor-filter', {
      mode: 'by_name',
      editors: current,
    })
  }
}
</script>

<template>
  <div class="sort-wrapper">
    <button class="sort-btn" @click="toggle">
      Фильтр редактора

      <vue-feather
        type="chevron-down"
        size="20"
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }"
      />
    </button>

    <div v-if="isOpen" class="dropdown">
      <label class="option">
        <input type="radio" value="all" :checked="mode === 'all'" @change="selectMode('all')" />
        Все
      </label>

      <label class="option">
        <input type="radio" value="mine" :checked="mode === 'mine'" @change="selectMode('mine')" />
        Вы
      </label>

      <label class="option">
        <input type="radio" value="none" :checked="mode === 'none'" @change="selectMode('none')" />
        Без редактора
      </label>

      <label class="option">
        <input
          type="radio"
          value="by_name"
          :checked="mode === 'by_name'"
          @change="selectMode('by_name')"
        />
        По фамилии
      </label>

      <div v-if="mode === 'by_name'" class="editor-search">
        <input v-model="search" class="search-input-small" placeholder="Поиск редактора" />

        <div class="editor-list">
          <label v-for="editor in filteredEditors" :key="editor.redactorsId" class="option">
            <input
              type="checkbox"
              :checked="selectedEditors.includes(editor.redactorsId)"
              @change="toggleEditor(editor.redactorsId)"
            />

            {{ editor.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
