<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import EditorNavigationBar from '@/components/editor/EditorNavigationBar.vue'
</script>

<template>
  <div class="page">
    <HeaderBar />

    <EditorNavigationBar />

    <section class="content">
      <router-view />
    </section>

    <footer class="footer">FOOTER</footer>
  </div>
</template>

<style scoped>
.page {
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 70px;
  background: white;
}

.nav {
  height: 120px;
  background: linear-gradient(90deg, #6f1c1c, #361919);
  color: white;
}

.content {
  width: 1340px;
  margin: -120px auto 40px auto;
  background: white;
  min-height: 600px;
  padding: 20px;
}

.footer {
  height: 515px;
  background: linear-gradient(90deg, #6f1c1c, #361919);
  margin-top: auto;
}
</style>
