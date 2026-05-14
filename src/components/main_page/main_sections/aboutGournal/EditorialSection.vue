<script setup>
defineProps({
  editorialAdvice: Array,
  editorialCollegium: Array,
})
</script>

<template>
  <div class="contents main-sections header-section">
    <!-- Заголовок -->
    <div class="text-blocks">
      <div class="title Lora-family large" style="color: white">Редакция</div>
    </div>
  </div>

  <div class="contents main-sections content">
    <div class="text-blocks">
      <div class="title Lora-family large">Редакция</div>

      <div class="title Lora-family big">Редакционный совет</div>

      <ul class="section-text">
        <li v-for="editor in editorialAdvice" :key="editor.id">
          {{ editor.name }} — {{ editor.mail }}
        </li>
      </ul>

      <div class="title Lora-family big">Редакционная коллегия</div>

      <ul class="section-text">
        <li v-for="editor in editorialCollegium" :key="editor.id">
          {{ editor.name }}: {{ editor.mail }}
        </li>
      </ul>
    </div>
  </div>
</template>
