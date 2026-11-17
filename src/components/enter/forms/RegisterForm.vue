<script setup>
import { computed, ref } from 'vue'
import VueFeather from 'vue-feather'
import { getUsers } from '@/api/editorApi'

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
const hasTriedToContinue = ref(false)
const users = ref([])
const apiError = ref('')

const allowedPasswordSymbols = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`

const isUsernameValid = computed(() => /^[a-z0-9_-]+$/.test(username.value))

const isPasswordValid = computed(
  () =>
    password.value.length >= 6 &&
    [...password.value].every(
      (character) => /[A-Za-z0-9]/.test(character) || allowedPasswordSymbols.includes(character),
    ),
)

const isUsernameTaken = computed(() =>
  users.value.some((user) => user.username?.toLowerCase() === username.value.trim().toLowerCase()),
)

const isEmailTaken = computed(() =>
  users.value.some((user) => user.user_mail?.toLowerCase() === email.value.trim().toLowerCase()),
)

const doEmailsMatch = computed(
  () => email.value.trim().toLowerCase() === confirmEmail.value.trim().toLowerCase(),
)

const doPasswordsMatch = computed(() => password.value === confirmPassword.value)

const hasMissingRequiredFields = computed(
  () =>
    !username.value.trim() ||
    !lastName.value.trim() ||
    !firstName.value.trim() ||
    !email.value.trim() ||
    !confirmEmail.value.trim() ||
    !password.value ||
    !confirmPassword.value ||
    !personalDataConsent.value,
)

const shouldShowUsernameFormatError = computed(
  () => username.value.length > 0 && !isUsernameValid.value,
)

async function submitRegistration() {
  hasTriedToContinue.value = true
  apiError.value = ''

  // Сначала показываем напоминание, не сбрасывая заполненные поля.
  if (hasMissingRequiredFields.value) return

  try {
    const response = await getUsers()
    users.value = response.data

    // Здесь пока только проверки формы; создание аккаунта не выполняется.
  } catch {
    apiError.value = 'Не удалось проверить данные. Попробуйте позже.'
  }
}
</script>

<template>
  <form class="content-block-vertical" novalidate @submit.prevent="submitRegistration">
    <button type="button" class="text-button">
      <vue-feather type="arrow-left" />
      <span class="basic-text-bold">Назад</span>
    </button>

    <h1 class="text-h2">Регистрация</h1>
    <span
      class="basic-text"
      :style="{ color: hasTriedToContinue && hasMissingRequiredFields ? 'var(--red-error)' : '' }"
    >
      * — обязательные поля
    </span>

    <div class="content-block-vertical">
      <div class="content-block-vertical">
        <label for="register-username" class="basic-text-bold">Имя пользователя *</label>
        <input
          id="register-username"
          v-model="username"
          class="enter-box register-form-input"
          :class="{
            error:
              shouldShowUsernameFormatError ||
              (hasTriedToContinue && (hasMissingRequiredFields || isUsernameTaken)),
          }"
          type="text"
          autocomplete="username"
          required
          aria-describedby="register-username-help register-username-error"
        />
        <span
          id="register-username-help"
          class="basic-text"
          :style="{ color: shouldShowUsernameFormatError ? 'var(--red-error)' : '' }"
        >
          Имя пользователя должно содержать только строчные буквы, цифры и дефисы/подчёркивания
        </span>
        <span
          v-if="hasTriedToContinue && isUsernameTaken"
          id="register-username-error"
          class="basic-text"
          :style="{ color: 'var(--red-error)' }"
          role="alert"
        >
          Данное имя пользователя уже занято другим пользователем
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
          :class="{ error: hasTriedToContinue && isEmailTaken }"
          type="email"
          autocomplete="email"
          required
        />
        <span
          v-if="hasTriedToContinue && isEmailTaken"
          class="basic-text"
          :style="{ color: 'var(--red-error)' }"
          role="alert"
        >
          Эта почта уже привязана к другому аккаунту.
        </span>
      </div>

      <div class="content-block-vertical">
        <label for="register-confirm-email" class="basic-text-bold">Подтвердите почту *</label>
        <input
          id="register-confirm-email"
          v-model="confirmEmail"
          class="enter-box register-form-input"
          :class="{
            error: hasTriedToContinue && confirmEmail.length > 0 && !doEmailsMatch,
          }"
          type="email"
          autocomplete="email"
          required
        />
        <span
          v-if="hasTriedToContinue && confirmEmail && !doEmailsMatch"
          class="basic-text"
          :style="{ color: 'var(--red-error)' }"
          role="alert"
        >
          Почты не совпадают
        </span>
      </div>

      <div class="content-block-vertical">
        <label for="register-password" class="basic-text-bold">Пароль *</label>

        <div class="content-block-horizontal password-field">
          <input
            id="register-password"
            v-model="password"
            class="enter-box register-form-input"
            :class="{ error: hasTriedToContinue && password && !isPasswordValid }"
            :type="isPasswordVisible ? 'text' : 'password'"
            autocomplete="new-password"
            required
            aria-describedby="register-password-help"
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

        <div
          id="register-password-help"
          class="basic-text"
          :style="{
            color: hasTriedToContinue && password && !isPasswordValid ? 'var(--red-error)' : '',
          }"
        >
          <p>Для пароля можно использовать только следующие символы:</p>
          <ul>
            <li>Заглавные латинские буквы: от A до Z</li>
            <li>Строчные латинские буквы: от a до z</li>
            <li>Цифры от 0 до 9</li>
            <li>
              Символы: ! " # $ % &amp; ' ( ) * + , - . / : ; &lt; = &gt; ? @ [ \ ] ^ _ ` { | } ~
            </li>
          </ul>
          <p>Пароль должен содержать минимум 6 символов.</p>
        </div>
      </div>

      <div class="content-block-vertical">
        <label for="register-confirm-password" class="basic-text-bold">Повторите пароль *</label>

        <div class="content-block-horizontal password-field">
          <input
            id="register-confirm-password"
            v-model="confirmPassword"
            class="enter-box register-form-input"
            :class="{
              error: hasTriedToContinue && confirmPassword && !doPasswordsMatch,
            }"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            autocomplete="new-password"
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

        <span
          v-if="hasTriedToContinue && confirmPassword && !doPasswordsMatch"
          class="basic-text"
          :style="{ color: 'var(--red-error)' }"
          role="alert"
        >
          Пароли не совпадают
        </span>
      </div>

      <label class="content-block-horizontal">
        <input v-model="personalDataConsent" type="checkbox" required />
        <span class="basic-text">
          Даю согласие на условия обработки и хранения персональных данных *
        </span>
      </label>
    </div>

    <span v-if="apiError" class="basic-text" :style="{ color: 'var(--red-error)' }" role="alert">
      {{ apiError }}
    </span>

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
