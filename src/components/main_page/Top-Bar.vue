<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="top-bar">
    <button class="link-buttons main">Поиск</button>

    <div class="divider"></div>

    <router-link to="/" class="link-buttons main" :class="{ active: route.path === '/' }">
      Главная страница
    </router-link>

    <router-link to="/editor/tasks" class="link-buttons main"> Страница редактора </router-link>

    <button class="link-buttons main">Страница рецензента</button>

    <button class="link-buttons main">Отправить рукопись</button>
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);

  background: var(--white);
  border-top: var(--strock-sm) solid var(--purple-main);

  padding: var(--spacing-md) 50px;
}

/* разделитель */
.divider {
  width: var(--strock-tn);
  height: 24px;
  background: var(--primary-gray-two);
}
</style>
