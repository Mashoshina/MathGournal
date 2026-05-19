<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import EditorNavigationBar from '@/components/editor/EditorNavigationBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="page">
    <HeaderBar />

    <EditorNavigationBar />

    <section class="content">
      <router-view />
    </section>

    <footer class="editor-footer"><AppFooter /></footer>
  </div>
</template>

<style scoped>
.content {
  width: 1340px;
  margin: -120px auto 40px auto;
  background: var(--white);
  min-height: 400px;
  padding: 24px;
  border-radius: 28px;
}

.editor-footer {
  height: auto;
  background: var(--editor-gradient);
  margin-top: auto;
}
</style>
