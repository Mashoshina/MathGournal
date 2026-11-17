<script setup>
import { onUnmounted, ref } from 'vue'
import VueFeather from 'vue-feather'

const step = ref(1)
const email = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const resendCountdown = ref(30)

let countdownInterval

const allowedPasswordSymbols = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`

function isPasswordValid(value) {
  return (
    value.length >= 6 &&
    [...value].every(
      (character) => /[A-Za-z0-9]/.test(character) || allowedPasswordSymbols.includes(character),
    )
  )
}

function validatePasswords() {
  const passwordInput = document.querySelector('#recovery-new-password')
  const confirmPasswordInput = document.querySelector('#recovery-confirm-password')

  if (!passwordInput || !confirmPasswordInput) return

  passwordInput.setCustomValidity(
    newPassword.value && !isPasswordValid(newPassword.value)
      ? 'Пароль содержит недопустимые символы или короче 6 символов.'
      : '',
  )

  confirmPasswordInput.setCustomValidity(
    confirmPassword.value && confirmPassword.value !== newPassword.value
      ? 'Пароли не совпадают.'
      : '',
  )
}

function startResendCountdown() {
  clearInterval(countdownInterval)
  resendCountdown.value = 30

  countdownInterval = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value -= 1
    } else {
      clearInterval(countdownInterval)
    }
  }, 1000)
}

function handleSubmit() {
  if (step.value === 1) {
    step.value = 2
    startResendCountdown()
    return
  }

  if (step.value === 2) {
    step.value = 3
  }
}

function resendCode() {
  if (resendCountdown.value > 0) return

  // Здесь позже можно добавить запрос на повторную отправку кода.
  startResendCountdown()
}

function handleBack() {
  if (step.value > 1) {
    step.value -= 1
  }
}

onUnmounted(() => {
  clearInterval(countdownInterval)
})
</script>

<template>
  <form class="content-block-vertical" @submit.prevent="handleSubmit">
    <button type="button" class="text-button" @click="handleBack">
      <vue-feather type="arrow-left" />
      <span class="basic-text-bold">Назад</span>
    </button>

    <template v-if="step === 1">
      <h1 class="text-h2">Укажите почту</h1>

      <div class="content-block-vertical">
        <span class="basic-text">Укажите электронную почту, привязанную к аккаунту</span>

        <div class="content-block-vertical">
          <label for="recovery-email" class="basic-text-bold">Электронная почта</label>
          <input
            id="recovery-email"
            v-model="email"
            class="enter-box recovery-form-input"
            type="email"
            autocomplete="email"
            required
          />
        </div>
      </div>

      <button type="submit" class="bright-button">
        <span class="basic-text-bold">Продолжить</span>
        <vue-feather type="arrow-right" />
      </button>
    </template>

    <template v-else-if="step === 2">
      <h1 class="text-h2">Введите код</h1>

      <div class="content-block-vertical">
        <span class="basic-text">
          На указанную почту отправлен код для восстановления пароля. Введите код в поле ниже. Если
          вы не нашли письмо с кодом, проверьте папку «Спам».
        </span>

        <div class="content-block-vertical">
          <label for="recovery-code" class="basic-text-bold">Код из электронной почты</label>
          <input
            id="recovery-code"
            v-model="verificationCode"
            class="enter-box recovery-form-input"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            required
          />
        </div>

        <span v-if="resendCountdown > 0" class="basic-text">
          Отправить новый код через 00:{{ String(resendCountdown).padStart(2, '0') }} с.
        </span>

        <button v-else type="button" class="text-button" @click="resendCode">
          <span class="basic-text-bold">Отправить новый код</span>
        </button>
      </div>

      <button type="submit" class="bright-button">
        <span class="basic-text-bold">Продолжить</span>
        <vue-feather type="arrow-right" />
      </button>
    </template>

    <template v-else>
      <h1 class="text-h2">Новый пароль</h1>

      <div class="content-block-vertical">
        <div class="basic-text">
          <p>Для пароля можно использовать следующие символы:</p>
          <ul>
            <li>Заглавные и строчные латинские буквы (A–Z, a–z)</li>
            <li>Цифры (0–9)</li>
            <li>
              Символы: ! " # $ % &amp; ' ( ) * + , - . / : ; &lt; = &gt; ? @ [ \ ] ^ _ ` { | } ~
            </li>
          </ul>
          <p>Пароль должен содержать минимум 6 символов.</p>
        </div>

        <div class="content-block-vertical">
          <label for="recovery-new-password" class="basic-text-bold">Новый пароль</label>
          <div class="content-block-horizontal password-field">
            <input
              id="recovery-new-password"
              v-model="newPassword"
              class="enter-box recovery-form-input"
              :type="isNewPasswordVisible ? 'text' : 'password'"
              autocomplete="new-password"
              minlength="6"
              required
              @input="validatePasswords"
            />
            <button
              type="button"
              class="text-button password-toggle"
              :aria-label="isNewPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
              @click="isNewPasswordVisible = !isNewPasswordVisible"
            >
              <vue-feather :type="isNewPasswordVisible ? 'eye-off' : 'eye'" />
            </button>
          </div>
        </div>

        <div class="content-block-vertical">
          <label for="recovery-confirm-password" class="basic-text-bold">Повторите пароль</label>
          <div class="content-block-horizontal password-field">
            <input
              id="recovery-confirm-password"
              v-model="confirmPassword"
              class="enter-box recovery-form-input"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              autocomplete="new-password"
              minlength="6"
              required
              @input="validatePasswords"
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
      </div>

      <button type="submit" class="bright-button">
        <span class="basic-text-bold">Продолжить</span>
        <vue-feather type="arrow-right" />
      </button>
    </template>
  </form>
</template>

<style scoped>
.recovery-form-input {
  box-sizing: border-box;
  height: 44px;
  flex: 1;
  min-width: 0;
}

.password-field {
  flex-wrap: nowrap;
}

.password-toggle {
  flex-shrink: 0;
}
</style>
