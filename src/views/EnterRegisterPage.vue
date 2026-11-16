<script setup>
import { ref } from 'vue'

import SiteFooter from '@/components/common/SiteFooter.vue'
import SiteHat from '@/components/common/SiteHat.vue'
import EnterRegisterForm from '@/components/enter/EnterRegisterForm.vue'

const formMode = ref('enter')
</script>

<template>
  <div class="common-page theme-main">
    <SiteHat :is-authenticated="false" />

    <main class="enter-page-content">
      <EnterRegisterForm :mode="formMode" />
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.enter-page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 48px 0;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .enter-page-content {
    padding: 16px 0;
    margin-bottom: 24px;
  }
}
</style>
