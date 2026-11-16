<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const isPasswordVisible = ref(false)
</script>

<template>
  <form class="content-block-vertical" @submit.prevent>
    <button type="button" class="text-button">
      <vue-feather type="arrow-left" />
      <span class="basic-text-bold">Назад</span>
    </button>

    <h1 class="text-h2">Войти в аккаунт</h1>

    <div class="content-block-vertical">
      <div class="content-block-vertical">
        <label for="username" class="basic-text-bold">
          Имя пользователя или электронная почта
        </label>
        <input
          id="username"
          v-model="username"
          class="enter-box enter-form-input"
          type="text"
          autocomplete="username"
        />
      </div>

      <div class="content-block-vertical">
        <label for="password" class="basic-text-bold">Пароль</label>

        <div class="content-block-horizontal">
          <input
            id="password"
            v-model="password"
            class="enter-box enter-form-input"
            :type="isPasswordVisible ? 'text' : 'password'"
            autocomplete="current-password"
          />
          <button
            type="button"
            class="text-button password-toggle"
            :aria-label="isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
            @click="isPasswordVisible = !isPasswordVisible"
          >
            <vue-feather :type="isPasswordVisible ? 'eye-off' : 'eye'" />
          </button>
        </div>
      </div>

      <button type="button" class="text-button">
        <span class="basic-text-bold">Забыл(а) пароль</span>
      </button>

      <label class="content-block-horizontal remember-option">
        <input v-model="rememberMe" type="checkbox" />
        <span class="basic-text">Сохранить вход на этом устройстве</span>
      </label>
    </div>

    <button type="submit" class="bright-button">
      <span class="basic-text-bold">Войти в аккаунт</span>
    </button>

    <div class="content-block-horizontal">
      <span class="basic-text-bold">Ещё нет аккаунта?</span>
      <button type="button" class="text-button">
        <span class="basic-text-bold">Зарегистрироваться</span>
      </button>
    </div>
  </form>
</template>

<style scoped>
.enter-form-input {
  box-sizing: border-box;
  height: 44px;
  flex: 1;
  min-width: 0;
}

.password-toggle {
  flex-shrink: 0;
}

.remember-option {
  width: fit-content;
}
</style>
