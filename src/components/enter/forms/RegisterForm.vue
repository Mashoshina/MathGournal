<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'

const username = ref('')
const lastName = ref('')
const firstName = ref('')
const middleName = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')
const personalDataConsent = ref(false)

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
</script>

<template>
  <form class="content-block-vertical" @submit.prevent>
    <button type="button" class="text-button">
      <vue-feather type="arrow-left" />
      <span class="basic-text-bold">Назад</span>
    </button>

    <h1 class="text-h2">Регистрация</h1>
    <span class="basic-text">* — обязательные поля</span>

    <div class="content-block-vertical">
      <div class="content-block-vertical">
        <label for="register-username" class="basic-text-bold">Имя пользователя *</label>
        <input
          id="register-username"
          v-model="username"
          class="enter-box register-form-input"
          type="text"
          autocomplete="username"
          pattern="[a-z0-9_-]+"
          required
        />
        <span class="basic-text">
          Имя пользователя должно содержать только строчные латинские буквы, цифры, дефисы и
          подчёркивания.
        </span>
      </div>

      <div class="content-block-vertical">
        <label for="register-last-name" class="basic-text-bold">Фамилия *</label>
        <input
          id="register-last-name"
          v-model="lastName"
          class="enter-box register-form-input"
          type="text"
          autocomplete="family-name"
          required
        />
      </div>

      <div class="content-block-vertical">
        <label for="register-first-name" class="basic-text-bold">Имя *</label>
        <input
          id="register-first-name"
          v-model="firstName"
          class="enter-box register-form-input"
          type="text"
          autocomplete="given-name"
          required
        />
      </div>

      <div class="content-block-vertical">
        <label for="register-middle-name" class="basic-text-bold">Отчество</label>
        <input
          id="register-middle-name"
          v-model="middleName"
          class="enter-box register-form-input"
          type="text"
          autocomplete="additional-name"
        />
      </div>

      <div class="content-block-vertical">
        <label for="register-email" class="basic-text-bold">Электронная почта *</label>
        <input
          id="register-email"
          v-model="email"
          class="enter-box register-form-input"
          type="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="content-block-vertical">
        <label for="register-confirm-email" class="basic-text-bold">Подтвердите почту *</label>
        <input
          id="register-confirm-email"
          v-model="confirmEmail"
          class="enter-box register-form-input"
          type="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="content-block-vertical">
        <label for="register-password" class="basic-text-bold">Пароль *</label>

        <div class="content-block-horizontal">
          <input
            id="register-password"
            v-model="password"
            class="enter-box register-form-input"
            :type="isPasswordVisible ? 'text' : 'password'"
            autocomplete="new-password"
            minlength="6"
            required
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

        <div class="basic-text">
          <p>Пароль должен содержать только следующие символы:</p>
          <ul>
            <li>Заглавные и строчные латинские буквы (A–Z, a–z)</li>
            <li>Цифры</li>
            <li>
              Символы: ! " # $ % &amp; ' ( ) * + , - . / : ; &lt; = &gt; ? @ [ \ ] ^ _ ` { | } ~
            </li>
          </ul>
          <p>Пароль должен содержать минимум 6 символов.</p>
        </div>
      </div>

      <div class="content-block-vertical">
        <label for="register-confirm-password" class="basic-text-bold">Повторите пароль *</label>

        <div class="content-block-horizontal">
          <input
            id="register-confirm-password"
            v-model="confirmPassword"
            class="enter-box register-form-input"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            autocomplete="new-password"
            minlength="6"
            required
          />
          <button
            type="button"
            class="text-button password-toggle"
            :aria-label="isConfirmPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
            @click="isConfirmPasswordVisible = !isConfirmPasswordVisible"
          >
            <vue-feather :type="isConfirmPasswordVisible ? 'eye-off' : 'eye'" />
          </button>
        </div>
      </div>

      <label class="content-block-horizontal">
        <input v-model="personalDataConsent" type="checkbox" required />
        <span class="basic-text">Даю согласие на обработку и хранение персональных данных *</span>
      </label>
    </div>

    <button type="submit" class="bright-button">
      <span class="basic-text-bold">Продолжить</span>
      <vue-feather type="arrow-right" />
    </button>
  </form>
</template>

<style scoped>
.register-form-input {
  box-sizing: border-box;
  height: 44px;
  flex: 1;
  min-width: 0;
}

.password-toggle {
  flex-shrink: 0;
}
</style>
