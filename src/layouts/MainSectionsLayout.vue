<script setup>
import { useRouter } from 'vue-router'
import HeaderBar from '@/components/HeaderBar.vue'
import TopBar from '@/components/main_page/Top-Bar.vue'
import AppFooter from '@/components/AppFooter.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="page">
    <HeaderBar />
    <TopBar />

    <!-- Цветная "обложка" -->
    <section class="section-header">
      <button class="back-btn" @click="goBack">← Назад</button>
    </section>

    <section class="content">
      <router-view />
    </section>

    <footer class="main-footer"><AppFooter /></footer>
  </div>
</template>

<style scoped>
.section-header {
  background: var(--main-gradient);
  padding: 40px 60px;

  color: white;
}

.content {
  padding: 24px;
  border-radius: 28px;
}

.main-footer {
  height: auto;
  background: var(--main-gradient);
  margin-top: auto;
}

.back-btn {
  background: none;
  border: none;
  color: var(--white);
  font-family: var(--font-Biryani);
  font-size: var(--size-bg);
  cursor: pointer;

  position: relative;
  padding: 0;
  margin-bottom: 16px;
}

/* линия */
.back-btn::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: white;

  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}

/* hover */
.back-btn:hover::after {
  transform: translateX(-50%) scaleX(1);
}
</style>
