<script setup>
import { computed } from 'vue'
import ManuscriptCard from './ManuscriptCard.vue'

const props = defineProps({
  manuscripts: Array,
  authors: Array,
  redactors: Array,
})

/* =========================
   Обогащаем рукописи
========================= */
const enrichedManuscripts = computed(() => {
  return props.manuscripts.map((manuscript) => {
    const manuscriptAuthors = props.authors.filter((author) =>
      manuscript.authorsId?.includes(author.authorsId),
    )

    const manuscriptRedactors = props.redactors.filter((redactor) =>
      manuscript.redactorsId?.includes(redactor.redactorsId),
    )

    return {
      ...manuscript,
      authors: manuscriptAuthors,
      redactors: manuscriptRedactors,
    }
  })
})
</script>

<template>
  <div class="containers">
    <ManuscriptCard
      v-for="manuscript in enrichedManuscripts"
      :key="manuscript.manuscriptId"
      :manuscript="manuscript"
    />
  </div>
</template>
