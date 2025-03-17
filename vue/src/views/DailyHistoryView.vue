<script setup lang="ts">
import dailyHistoryStore from '@/stores/history'
import { SectionKey, sectionTitle, computedNavigationItems } from '@/models/navigation'
import { capitalCase } from 'change-case'
import NavigationBar from '@/components/vueties/bars/NavigationBar.vue'

const sectionKey = SectionKey.DailyHistory
const dailyHistory = dailyHistoryStore()
const navigationItems = computedNavigationItems(sectionKey)
</script>

<template>
  <NavigationBar :items="navigationItems" :title="sectionTitle(sectionKey)" />
  <main>
    <section class="form">
      <ul>
        <li 
          class="info"
          v-for="(word, index) of dailyHistory.words.sort((s1, s2) => s1.localeCompare(s2))"
          :key="index"
        >
        {{ capitalCase(word.split(',')[0]) }}
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped lang="scss">
</style>
