<!-------------------------------------------
              HAT
  Адаптивный компонент шапки (desktop / mobile).

  Точки адаптивности:
    desktop : min-width 769px
    mobile  : max-width 768px

  Тематические подварианты (берутся от родителя):
    .main    — фиолетовая тема   (--purple-main)
    .editor  — красная тема      (--red-editor)
    .review  — зелёная тема      (--green-review)

  Зависимости: color_tokens.css, new_text_styles.css, new_buttons.css
  (текст внутри набирается классами basic-text-bold / text-h3 / text-buttons / basic-bold-text)
--------------------------------------------->

<script setup>
import VueFeather from 'vue-feather'

// Информация об авторизации передаётся родительским компонентом.
const props = defineProps({
  isAuthenticated: {
    type: Boolean,
    default: true,
  },
})

// События, передаваемые родительскому компоненту.
const emit = defineEmits(['notifs', 'profile', 'authtorization'])

// Обработчики нажатий.
const openNotifications = () => {
  emit('notifs')
}

const openProfile = () => {
  emit('profile')
}

const openAuthorization = () => {
  emit('authtorization')
}
</script>

<template>
  <header class="site-hat content-block-horizontal">
    <!-- Логотип и название журнала -->
    <div
      class="content-block-horizontal"
      style="width: auto; flex: 1 1 auto; flex-wrap: nowrap; min-width: max-content"
    >
      <img src="@/assets/logo.png" alt="logo" class="site-hat-logo" />
      <div class="content-block-vertical">
        <span class="text-h3">
          Челябинский<br />
          <span style="color: var(--red-editor)"> физико-математический<br /> </span>
          журнал
          <br />
        </span>
      </div>
    </div>

    <!-- Кнопки действий -->
    <div
      class="content-block-horizontal"
      style="width: auto; flex: 0 0 auto; flex-wrap: nowrap; margin-left: auto"
    >
      <!-- Авторизованный пользователь -->
      <template v-if="props.isAuthenticated">
        <button type="button" class="text-button" @click="openNotifications">
          <span class="basic-text-bold"> Уведомления </span>
          <!-- Feather: bell -->
          <vue-feather type="bell" size="auto" />
        </button>
        <button type="button" class="text-button" @click="openProfile">
          <span class="basic-text-bold"> Профиль </span>
          <!-- Feather: user -->
          <vue-feather type="user" size="auto" />
        </button>
      </template>

      <!-- Неавторизованный пользователь -->
      <template v-else>
        <button type="button" class="text-button" @click="openAuthorization">
          <span class="basic-text-bold"> Войти </span>
          <!-- Feather: log-in -->
          <vue-feather type="log-in" size="auto" />
        </button>
      </template>
    </div>
  </header>
</template>

<style scoped>
/* Основная шапка сайта */
.site-hat {
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 50px;
  border-bottom: 2px solid var(--btn-theme, var(--purple-main));
  background: white;
}

/* Логотип */
.site-hat-logo {
  display: block;
  height: 48px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  flex-shrink: 0;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .site-hat {
    padding: 8px 25px;
  }
}
</style>
