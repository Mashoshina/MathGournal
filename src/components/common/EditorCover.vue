<script setup>
import { ref } from 'vue'

// Активный раздел редактора
const activeSection = ref('tasks')

// События, передаваемые родительскому компоненту
const emit = defineEmits(['home', 'tasks', 'manuscripts', 'analytics'])

// Переход на главную страницу
const goHome = () => {
  emit('home')
}

// Выбор раздела редактора
const selectSection = (section) => {
  activeSection.value = section
  emit(section)
}
</script>

<template>
  <section class="editor-cover">
    <!-- Хлебные крошки -->
    <div class="editor-cover-breadcrumbs">
      <a href="/" class="hyperlinks" @click.prevent="goHome"> Главная > </a>
    </div>

    <!-- Заголовок страницы -->
    <h1 class="text-h1 editor-cover-title">Страница редактора</h1>

    <!-- Навигация по разделам редактора -->
    <!-- Навигация по разделам редактора -->
    <div class="content-block-horizontal">
      <button
        type="button"
        class="navigation-big"
        :class="{ 'is-pressed': activeSection === 'tasks' }"
        :aria-pressed="activeSection === 'tasks'"
        @click="selectSection('tasks')"
      >
        <span class="text-h2">Задачи</span>
      </button>

      <button
        type="button"
        class="navigation-big"
        :class="{ 'is-pressed': activeSection === 'manuscripts' }"
        :aria-pressed="activeSection === 'manuscripts'"
        @click="selectSection('manuscripts')"
      >
        <span class="text-h2">Рукописи</span>
      </button>

      <button
        type="button"
        class="navigation-big"
        :class="{ 'is-pressed': activeSection === 'analytics' }"
        :aria-pressed="activeSection === 'analytics'"
        @click="selectSection('analytics')"
      >
        <span class="text-h2">Аналитика</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Основная обложка редактора */
.editor-cover {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 24px 50px 240px;
  gap: 16px;
  background: var(--red-gradient);
}

/* Хлебные крошки */
.editor-cover-breadcrumbs {
  display: flex;
  align-items: center;
  width: 100%;
}

.editor-cover-breadcrumbs .hyperlinks {
  color: white;
}

/* Заголовок страницы */
.editor-cover-title {
  color: white;
}

/* Навигация */
.editor-cover-navigation {
  width: 100%;
  align-items: center;
  gap: 16px;
}

/* Кнопки навигации */
.editor-cover-navigation .navigation-big {
  width: auto;
  flex: auto;
  background: transparent;
  color: white;
}
</style>
