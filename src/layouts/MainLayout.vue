<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import TopBar from '@/components/main_page/Top-Bar.vue'
import MainNavigationBar from '@/components/main_page/MainNavigationBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="page">
    <HeaderBar />
    <TopBar />
    <MainNavigationBar />

    <div class="line main"></div>

    <section class="content">
      <router-view />
    </section>

    <footer class="main-footer"><AppFooter /></footer>
  </div>
</template>

<style>
.content {
  width: 1400;
  margin-right: 60px;
  margin-left: 60px;
  min-height: 600px;
  padding: 24px;
  border-radius: 28px;
}

.main-footer {
  height: auto;
  background: var(--main-gradient);
  margin-top: auto;
}
</style>
