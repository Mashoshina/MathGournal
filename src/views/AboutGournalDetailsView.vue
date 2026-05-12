<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import EditorialSection from '@/components/main_page/main_sections/aboutGournal/EditorialSection.vue'
import PeopleSection from '@/components/main_page/main_sections/aboutGournal/PeopleSection.vue'

import SectionsPolicySection from '@/components/main_page/main_sections/aboutGournal/SectionsPolicySection.vue'

import SendOnlineSection from '@/components/main_page/main_sections/aboutGournal/SendOnlineSection.vue'

import SiteMapSection from '@/components/main_page/main_sections/aboutGournal/SiteMapSection.vue'
import SystemSection from '@/components/main_page/main_sections/aboutGournal/SystemSection.vue'
import SponsorsSection from '@/components/main_page/main_sections/aboutGournal/SponsorsSection.vue'

const route = useRoute()

const section = computed(() => route.params.section)

const editorialAdvice = ref([])
const editorialCollegium = ref([])

onMounted(async () => {
  const [redactorsRes, adviceRes, collegiumRes] = await Promise.all([
    axios.get('http://localhost:3001/redactors'),
    axios.get('http://localhost:3001/editoralAdvice'),
    axios.get('http://localhost:3001/editoralCollegium'),
  ])

  const redactors = redactorsRes.data

  const adviceIds = adviceRes.data[0]?.redactorsId || []
  const collegiumIds = collegiumRes.data[0]?.redactorsId || []

  editorialAdvice.value = redactors.filter((r) => adviceIds.includes(r.redactorsId))

  editorialCollegium.value = redactors.filter((r) => collegiumIds.includes(r.redactorsId))
})
</script>

<template>
  <div class="page">
    <EditorialSection
      v-if="section === 'editorial'"
      :editorialAdvice="editorialAdvice"
      :editorialCollegium="editorialCollegium"
    />
    <PeopleSection v-else-if="section === 'people'" />

    <SectionsPolicySection v-else-if="section === 'sections-policy'" />
    <SectionsPolicySection v-else-if="section === 'plagiarism'" />
    <SectionsPolicySection v-else-if="section === 'open-access'" />

    <SendOnlineSection v-else-if="section === 'submission'" />
    <SendOnlineSection v-else-if="section === 'authors-guide'" />
    <SendOnlineSection v-else-if="section === 'review-rules'" />
    <SendOnlineSection v-else-if="section === 'privacy'" />

    <SiteMapSection v-else-if="section === 'site-map'" />
    <SystemSection v-else-if="section === 'system'" />
    <SponsorsSection v-else-if="section === 'sponsors'" />
  </div>
</template>
