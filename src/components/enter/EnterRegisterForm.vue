<script setup>
import { computed } from 'vue'

import EnterForm from './forms/EnterForm.vue'
import PasswordRecoveryForm from './forms/PasswordRecoveryForm.vue'
import RegisterForm from './forms/RegisterForm.vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'enter',
  },
})

const formComponents = {
  enter: EnterForm,
  register: RegisterForm,
  passwordRecovery: PasswordRecoveryForm,
}

const activeForm = computed(() => formComponents[props.mode] || EnterForm)
</script>

<template>
  <component :is="activeForm" class="enter-register-form" />
</template>

<style scoped></style>
