<script setup>
defineProps({
  task: Object,
})
</script>

<template>
  <div class="task-card">
    <div class="task-header">
      <div class="task-title">
        {{ task.type }} | {{ task.stage }} | Задача создана: {{ task.createdAt }}
      </div>
    </div>

    <div class="task-body">
      <p>
        <strong>{{ task.manuscriptTitle }}</strong>
      </p>

      <p class="version-line">
        <span class="version-badge"> Версия {{ task.version }} </span>

        <span class="sent-date"> Рукопись подана: {{ task.manuscriptSentDate }} </span>
      </p>

      <p>
        Автор:
        {{ task.authorName }} |
        {{ task.authorMail }}
      </p>

      <p>
        Приглашено рецензентов:
        {{ task.invitedCount }} | Приняли: {{ task.acceptedCount }} | Отклонили:
        {{ task.declinedCount }}
      </p>

      <p>
        Отчётов рецензентов:
        {{ task.reportsCount }}
      </p>

      <p>
        Дедлайн:
        {{ task.deadline }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  width: 1200px;
  margin: 0 auto 20px auto;
  padding: 20px;
  background: white;
  border-left: 5px solid #810e17;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.task-header {
  background: #ecd5df;
  padding: 12px 16px;
  margin: -20px -20px 15px -20px;
}

.task-title {
  font-family: 'Lora', serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.task-title:hover {
  color: #810e17;
  text-decoration: underline;
}

.task-body {
  font-family: 'Biryani', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
}

.version-line {
  display: flex;
  align-items: center;
  gap: 12px;
}

.version-badge {
  display: inline-block; /* ключевой момент */
  padding: 4px 14px;
  border: 1px solid #810e17;
  border-radius: 999px; /* идеальный овал */
  font-size: 14px; /* такой же как тело карточки */
  font-family: 'Biryani', sans-serif;
  font-weight: 400;
  white-space: nowrap; /* чтобы текст не переносился */
}

.sent-date {
  color: #000000;
}
</style>
