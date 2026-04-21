<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  task: Object,
})
</script>

<template>
  <div class="card">
    <!-- ===== Заголовок ===== -->
    <router-link :to="`/editor/tasks/${task.id}`" class="task-card-header">
      <span> {{ task.type }}</span>
      <span> {{ task.stage }}</span>
      <span> {{ task.createdAt }}</span>
    </router-link>

    <!-- ===== Тело ===== -->
    <div class="card-body">
      <div class="task-card-title">
        {{ task.manuscriptTitle }}
      </div>

      <!-- ===== Версия + дата подачи ===== -->
      <div class="info-block">
        <span class="version-badge"> Версия {{ task.version }} </span>
        <span> Рукопись подана: {{ task.manuscriptSentDate }} </span>
      </div>

      <!-- ===== Авторы ===== -->
      <div class="info-block">
        <strong>Автор(ы):</strong>
        <div v-for="author in task.authors" :key="author.authorsId">
          {{ author.name }}: {{ author.mail }}
        </div>
      </div>

      <!-- ===== Сколько приглашено рецензентов ===== -->
      <div class="info-block">
        Приглашено рецензентов: {{ task.invitedCount }} Приняли: {{ task.acceptedCount }} Отклонили:
        {{ task.declinedCount }}
      </div>

      <!-- ===== Сколько отчётов ===== -->
      <div class="info-block">
        Отчётов рецензентов:
        {{ task.reportsCount }}
      </div>
    </div>
  </div>
</template>
