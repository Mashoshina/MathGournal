<script setup>
import { computed } from 'vue'
import TaskCard from './TaskCard.vue'

const props = defineProps({
  tasks: Array,
  manuscripts: Array,
  authors: Array,
  reviewers: Array,
  reviews: Array,
})

/* Формируем задачи*/
const preparedTasks = computed(() => {
  return props.tasks.map((task) => {
    const manuscript = props.manuscripts.find((m) => m.manuscriptId === task.manuscriptId)

    const authorsList = manuscript
      ? props.authors.filter((a) => manuscript.authorsId.includes(a.authorsId))
      : []

    return {
      id: task.id,
      taskId: task.taskId,
      stage: task.stage,
      type: task.type,
      createdAt: task.createdAt,
      version: manuscript?.version,

      manuscriptTitle: manuscript?.title,
      authors: authorsList,
      manuscriptSentDate: manuscript?.sentDate,

      invitedCount: task.invitedReviewersId.length,
      acceptedCount: task.acceptedReviewersId.length,
      declinedCount: task.declinedReviewersId.length,
      reportsCount: task.reviewesId.length,
    }
  })
})
</script>

<template>
  <div class="containers">
    <TaskCard v-for="task in preparedTasks" :key="task.id" :task="task" />
  </div>
</template>
