<!-------------------------------------------
              COVER (review / editor)
  Адаптивный компонент обложки (desktop / mobile).

  Точки адаптивности:
    desktop : min-width 769px
    mobile  : max-width 768px

  Зависимости: color_tokens.css, new_text_styles.css, new_buttons.css
--------------------------------------------->

<script setup>
// import { useRouter } from 'vue-router';
// const router = useRouter();

const emit = defineEmits([
  'about', // О нас
  'current-issue', // Текущий выпуск
  'archive', // Архив
  'submit-manuscript', // Отправить рукопись
])

// Функции для обработки кликов по кнопкам навигации
const openAbout = () => emit('about')
const openCurrentIssue = () => emit('current-issue')
const openArchive = () => emit('archive')
const openSubmitManuscript = () => emit('submit-manuscript')
</script>

<template>
  <main class="main-cover">
    <!-- Основная цветовая обложка -->
    <section class="color-cover">
      <!-- Название журнала -->
      <div class="cover-name">
        <h1 class="text-h1">Челябинский физико-математический журнал</h1>
      </div>

      <!-- Документы и регистрационные сведения -->
      <div class="content-block-vertical cover-documents">
        <a href="#" class="hyperlinks">
          Свидетельство о регистрации в национальном агентстве ISSN (электронное издание)
        </a>

        <a href="#" class="hyperlinks">
          Свидетельство ПИ № ФС77-64248 о регистрации средства массовой информации в Роскомнадзоре
        </a>

        <a href="#" class="hyperlinks"> Индекс 94191 в объединенном каталоге «Пресса России» </a>

        <a href="#" class="hyperlinks">
          Свидетельство о регистрации в Национальном агентстве ISSN (печатное издание)
        </a>
      </div>
    </section>

    <!-- Панель навигации -->
    <nav class="medium-bar">
      <button type="button" class="text-button" @click="openAbout">
        <span class="basic-text-bold">О нас</span>
      </button>

      <button type="button" class="text-button" @click="openCurrentIssue">
        <span class="basic-text-bold">Текущий выпуск</span>
      </button>

      <button type="button" class="text-button" @click="openArchive">
        <span class="basic-text-bold">Архив</span>
      </button>

      <button type="button" class="text-button medium-bar-submit" @click="openSubmitManuscript">
        <span class="basic-text-bold">Отправить рукопись</span>
      </button>
    </nav>
  </main>
</template>

<style scoped>
/* Основной контейнер обложки */
.main-cover {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  padding: 0;
  gap: 0;
  box-sizing: border-box;
}

/* Цветовая обложка */
.color-cover {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 32px;
  gap: 16px;
  background: var(--theme-gradient, var(--purple-gradient));
}

/* Название журнала */
.cover-name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 32px;
  gap: 0;
  background: white;
}

.cover-name .text-h1 {
  color: black;
}

/* Документы и регистрационные сведения (цвет гиперссылок)*/
.cover-documents .hyperlinks {
  color: white;
}

/* Панель навигации */
.medium-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 32px;
  gap: 16px;
  background: var(--theme-color-soft, var(--soft-purple));
}

/* Кнопки навигации */
.medium-bar .text-button {
  width: auto;
  flex: 0 0 auto;
  color: black;
}

.medium-bar .text-button:hover,
.medium-bar .text-button:active,
.medium-bar .text-button:focus-visible {
  color: var(--purple-main);
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .color-cover {
    padding: 16px;
    gap: 8px;
  }

  .cover-name {
    padding: 4px 16px;
  }

  .medium-bar {
    padding: 4px 16px;
    gap: 8px;
  }

  /* Кнопка отправки рукописи на мобильных не отображается */
  .medium-bar-submit {
    display: none;
  }
}
</style>
