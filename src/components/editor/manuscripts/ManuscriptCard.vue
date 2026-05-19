<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  manuscript: Object,
})

const router = useRouter()

const openManuscript = () => {
  router.push(`/editor/manuscripts/${props.manuscript.id}`)
}
</script>

<template>
  <div class="card">
    <!-- ===== Заголовок ===== -->
    <div class="cards editor headers manuscripts">
      <span>
        {{ manuscript.stage }} &nbsp;|&nbsp;

        <template v-if="manuscript.redactors?.length">
          {{ manuscript.redactors.map((r) => r.name).join(', ') }}
        </template>
        <template v-else> Без редактора </template>

        &nbsp;|&nbsp; Рукопись подана: {{ manuscript.sentDate }}
      </span>
    </div>

    <!-- ===== Тело ===== -->
    <div class="card-body">
      <!-- Название -->
      <div class="cards editor titles manuscripts" @click="openManuscript">
        {{ manuscript.title }}
      </div>

      <!-- Дата публикации -->
      <div v-if="manuscript.stage === 'Опубликовано'" class="published">
        Опубликована: {{ manuscript.sentDate }}
      </div>

      <!-- Авторы -->
      <div class="cards info-block">
        <strong>Автор(ы):</strong>
        <div v-for="author in manuscript.authors" :key="author.authorsId">
          {{ author.name }} ({{ author.mail }})
        </div>
      </div>

      <!-- Редактор -->
      <div class="cards info-block">
        <strong>Редактор(ы): </strong>
        <div v-if="manuscript.redactors?.length">
          <div v-for="r in manuscript.redactors" :key="r.redactorsId">
            {{ r.name }} ({{ r.mail }})
          </div>
        </div>
        <span v-else> Без редактора </span>
      </div>

      <!-- Сборник + область -->
      <div class="cards info-block"><strong>Раздел: </strong>{{ manuscript.chapter }}</div>
    </div>
  </div>
</template>

<style scoped>
.published {
  font-size: 14px;
  color: #2e7d32;
}
</style>
