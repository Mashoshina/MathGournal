<script setup>
import StatusFilter from './StatusFilters.vue'
import EditorFilter from './EditorFilter.vue'

defineProps({
  status: String,
  editorFilter: Object,
  editors: Array,
})

const emit = defineEmits(['change-status', 'change-editor-filter'])
</script>

<template>
  <div class="filters-row">
    <StatusFilter :status="status" @change-status="emit('change-status', $event)" />

    <EditorFilter
      :mode="editorFilter.mode"
      :selectedEditors="editorFilter.editors"
      :editors="editors"
      @change-editor-filter="emit('change-editor-filter', $event)"
    />
  </div>
</template>
