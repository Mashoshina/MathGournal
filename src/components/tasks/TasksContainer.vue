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

const preparedTasks = computed(() => {
  return props.tasks.map((task) => {
    const manuscript = props.manuscripts.find((m) => m.manuscriptId === task.manuscriptId)

    const author = manuscript
      ? props.authors.find((a) => a.authorsId === manuscript.authorsId[0])
      : null

    return {
      id: task.id,
      taskId: task.taskId,
      stage: task.stage,
      type: task.type,
      createdAt: task.createdAt,
      deadline: task.deadline,
      version: task.version,

      manuscriptTitle: manuscript?.title,
      authorName: author?.name,
      authorMail: author?.mail,
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
  <div class="tasks-container">
    <div class="tasks-inner">
      <TaskCard v-for="task in preparedTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<style scoped>
.tasks-container {
  width: 1340px;
  height: 500px;
  overflow: hidden;
}

.tasks-inner {
  height: 100%;
  overflow-y: auto;
  padding-top: 12px;
  border: 1px solid #e6e6e6;
  background: #ffffff;
}
</style>
