<script setup>
import { onUnmounted, ref } from 'vue'
import VueFeather from 'vue-feather'
import { getUsers } from '@/api/editorApi'

const emit = defineEmits(['password-reset'])

const step = ref(1)
const email = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const isSubmitting = ref(false)
const hasTriedPasswordSubmit = ref(false)
const resendCountdown = ref(30)
const error = ref({ field: '', message: '' })

const allowedPasswordSymbols = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`

let countdownInterval

function isPasswordValid(value) {
  return (
    value.length >= 6 &&
    [...value].every(
      (character) => /[A-Za-z0-9]/.test(character) || allowedPasswordSymbols.includes(character),
    )
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

async function handleSubmit() {
  error.value = { field: '', message: '' }

  if (step.value === 1) {
    isSubmitting.value = true

    try {
      const response = await getUsers()
      const normalizedEmail = email.value.trim().toLowerCase()
      const userExists = response.data.some(
        (user) => user.user_mail?.trim().toLowerCase() === normalizedEmail,
      )

      if (!userExists) {
        error.value = {
          field: 'email',
          message: 'Пользователя с такой электронной почтой не найдено',
        }
        return
      }

      step.value = 2
      startResendCountdown()
    } catch {
      error.value = {
        field: 'form',
        message: 'Не удалось проверить почту. Попробуйте позже.',
      }
    } finally {
      isSubmitting.value = false
    }

    return
  }

  if (step.value === 2) {
    // Пока проверка кода не подключена: любой непустой код принимается.
    if (!verificationCode.value.trim()) return

    step.value = 3
    return
  }

  hasTriedPasswordSubmit.value = true

  if (!isPasswordValid(newPassword.value)) return

  if (newPassword.value !== confirmPassword.value) {
    error.value = {
      field: 'confirmPassword',
      message: 'Пароли не совпадают',
    }
    return
  }

  emit('password-reset', {
    email: email.value.trim(),
    password: newPassword.value,
  })
}

function resendCode() {
  if (resendCountdown.value > 0) return

  // Пока повторная отправка не подключена — только перезапускаем таймер.
  startResendCountdown()
}

function handleBack() {
  if (step.value > 1) {
    step.value -= 1
    error.value = { field: '', message: '' }
  }
}

function clearError(field) {
  if (error.value.field === field) {
    error.value = { field: '', message: '' }
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
            :class="{ error: error.field === 'email' }"
            type="email"
            autocomplete="email"
            required
            :aria-invalid="error.field === 'email'"
            @input="clearError('email')"
          />
          <span
            v-if="error.field === 'email'"
            class="basic-text"
            :style="{ color: 'var(--red-error)' }"
            role="alert"
          >
            {{ error.message }}
          </span>
        </div>

        <span
          v-if="error.field === 'form'"
          class="basic-text"
          :style="{ color: 'var(--red-error)' }"
          role="alert"
        >
          {{ error.message }}
        </span>
      </div>

      <button type="submit" class="bright-button" :disabled="isSubmitting">
        <span class="basic-text-bold">
          {{ isSubmitting ? 'Проверка…' : 'Продолжить' }}
        </span>
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
        <div
          class="basic-text"
          :style="{
            color:
              hasTriedPasswordSubmit && !isPasswordValid(newPassword) ? 'var(--red-error)' : '',
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

        <div class="content-block-vertical">
          <label for="recovery-new-password" class="basic-text-bold">Новый пароль</label>
          <div class="content-block-horizontal password-field">
            <input
              id="recovery-new-password"
              v-model="newPassword"
              class="enter-box recovery-form-input"
              :class="{
                error: hasTriedPasswordSubmit && !isPasswordValid(newPassword),
              }"
              :type="isNewPasswordVisible ? 'text' : 'password'"
              autocomplete="new-password"
              required
              @input="clearError('confirmPassword')"
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
              :class="{ error: error.field === 'confirmPassword' }"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              autocomplete="new-password"
              required
              @input="clearError('confirmPassword')"
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
            v-if="error.field === 'confirmPassword'"
            class="basic-text"
            :style="{ color: 'var(--red-error)' }"
            role="alert"
          >
            {{ error.message }}
          </span>
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
