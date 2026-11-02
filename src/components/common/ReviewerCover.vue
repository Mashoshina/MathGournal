<script setup>
import { ref } from 'vue'

// Активный раздел рецензента
const activeSection = ref('reviews')

// События, передаваемые родительскому компоненту
const emit = defineEmits(['home', 'reviews', 'manuscripts', 'invitations'])

// Переход на главную страницу
const goHome = () => {
  emit('home')
}

// Выбор раздела рецензента
const selectSection = (section) => {
  activeSection.value = section
  emit(section)
}
</script>

<template>
  <section class="reviewer-cover">
    <!-- Хлебные крошки -->
    <div class="reviewer-cover-breadcrumbs">
      <a href="/" class="hyperlinks" @click.prevent="goHome"> Главная > </a>
    </div>

    <!-- Заголовок страницы -->
    <h1 class="text-h1 reviewer-cover-title">Страница рецензента</h1>

    <!-- Навигация по разделам рецензента -->
    <div class="content-block-horizontal">
      <button
        type="button"
        class="navigation-big"
        :class="{ 'is-pressed': activeSection === 'reviews' }"
        :aria-pressed="activeSection === 'reviews'"
        @click="selectSection('reviews')"
      >
        <span class="text-h2">Текущие рецензии</span>
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
        :class="{ 'is-pressed': activeSection === 'invitations' }"
        :aria-pressed="activeSection === 'invitations'"
        @click="selectSection('invitations')"
      >
        <span class="text-h2">Приглашения</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Основная обложка рецензента */
.reviewer-cover {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 24px 50px 240px;
  gap: 16px;
  background: var(--green-gradient);
}

/* Хлебные крошки */
.reviewer-cover-breadcrumbs {
  display: flex;
  align-items: center;
  width: 100%;
}

.reviewer-cover-breadcrumbs .hyperlinks {
  color: white;
}

/* Заголовок страницы */
.reviewer-cover-title {
  color: white;
}

/* Навигация */
.reviewer-cover-navigation {
  width: 100%;
  align-items: center;
  gap: 16px;
}

/* Кнопки навигации */
.reviewer-cover-navigation .navigation-big {
  width: auto;
  flex: auto;
  background: transparent;
  color: white;
}
</style>
