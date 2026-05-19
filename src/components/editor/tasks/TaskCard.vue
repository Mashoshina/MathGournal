<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  task: Object,
})
</script>

<template>
  <div class="card">
    <!-- ===== Заголовок ===== -->
    <router-link :to="`/editor/tasks/${task.id}`" class="cards editor headers tasks">
      <span>
        {{ task.type }} &nbsp;|&nbsp; {{ task.stage }} &nbsp;|&nbsp; Задача создана:
        {{ task.createdAt }}</span
      >
    </router-link>

    <!-- ===== Тело ===== -->
    <div class="card-body">
      <div class="cards editor titles tasks">
        {{ task.manuscriptTitle }}
      </div>

      <!-- ===== Версия + дата подачи ===== -->
      <div class="cards info-block">
        <span class="version-badge"> Версия {{ task.version }} </span>
        <span> Рукопись подана: {{ task.manuscriptSentDate }} </span>
      </div>

      <!-- ===== Авторы ===== -->
      <div class="cards info-block">
        <strong>Автор(ы):</strong>
        <div v-for="author in task.authors" :key="author.authorsId">
          {{ author.name }} ({{ author.mail }})
        </div>
      </div>

      <!-- ===== Сколько приглашено рецензентов ===== -->
      <div class="cards info-block">
        Приглашено рецензентов: {{ task.invitedCount }} Приняли: {{ task.acceptedCount }} Отклонили:
        {{ task.declinedCount }}
      </div>

      <!-- ===== Сколько отчётов ===== -->
      <div class="cards info-block">
        Отчётов рецензентов:
        {{ task.reportsCount }}
      </div>
    </div>
  </div>
</template>
