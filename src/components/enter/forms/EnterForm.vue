<script setup>
import { ref } from 'vue'
import VueFeather from 'vue-feather'
import { getUsers } from '@/api/editorApi'

const emit = defineEmits(['login-success'])

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const isPasswordVisible = ref(false)
const isSubmitting = ref(false)
const loginError = ref(null)

function clearLoginError(field) {
  if (loginError.value?.field === field) {
    loginError.value = null
  }
}

async function submitLogin() {
  loginError.value = null
  isSubmitting.value = true

  try {
    const response = await getUsers()
    const login = username.value.trim().toLowerCase()

    const user = response.data.find(
      (candidate) =>
        candidate.username?.toLowerCase() === login || candidate.user_mail?.toLowerCase() === login,
    )

    if (!user) {
      loginError.value = {
        field: 'username',
        message: 'Пользователя с таким именем пользователя или электронной почтой не найдено',
      }
      return
    }

    if (!password.value || user.password !== password.value) {
      loginError.value = {
        field: 'password',
        message: 'Неверный пароль',
      }
      return
    }

    // Не передаём пароль родительскому компоненту.
    emit('login-success', {
      id: user.id,
      username: user.username,
      user_mail: user.user_mail,
      roles: user.roles,
    })
  } catch {
    loginError.value = {
      field: 'form',
      message: 'Не удалось проверить данные. Попробуйте позже.',
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="content-block-vertical" @submit.prevent="submitLogin">
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
          :class="{ error: loginError?.field === 'username' }"
          type="text"
          autocomplete="username"
          required
          :aria-invalid="loginError?.field === 'username'"
          @input="clearLoginError('username')"
        />
        <span
          v-if="loginError?.field === 'username'"
          class="basic-text"
          :style="{ color: 'var(--red-error)' }"
          role="alert"
        >
          {{ loginError.message }}
        </span>
      </div>

      <div class="content-block-vertical">
        <label for="password" class="basic-text-bold">Пароль</label>

        <div class="content-block-horizontal">
          <input
            id="password"
            v-model="password"
            class="enter-box enter-form-input"
            :class="{ error: loginError?.field === 'password' }"
            :type="isPasswordVisible ? 'text' : 'password'"
            autocomplete="current-password"
            :aria-invalid="loginError?.field === 'password'"
            @input="clearLoginError('password')"
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

        <span
          v-if="loginError?.field === 'password'"
          class="basic-text"
          :style="{ color: 'var(--red-error)' }"
          role="alert"
        >
          {{ loginError.message }}
        </span>
      </div>

      <button type="button" class="text-button">
        <span class="basic-text-bold">Забыл(а) пароль</span>
      </button>

      <label class="content-block-horizontal remember-option">
        <input v-model="rememberMe" type="checkbox" />
        <span class="basic-text">Сохранить вход на этом устройстве</span>
      </label>

      <span
        v-if="loginError?.field === 'form'"
        class="basic-text"
        :style="{ color: 'var(--red-error)' }"
        role="alert"
      >
        {{ loginError.message }}
      </span>
    </div>

    <button type="submit" class="bright-button" :disabled="isSubmitting">
      <span class="basic-text-bold">
        {{ isSubmitting ? 'Проверка…' : 'Войти в аккаунт' }}
      </span>
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
