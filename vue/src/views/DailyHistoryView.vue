<script setup lang="ts">
import dailyHistoryStore from '@/stores/history'
import { SectionKey, navigationMap } from '@/models/navigation'
import { capitalCase } from 'change-case'
import NavBar from '@/components/NavBar.vue'

const dailyHistory = dailyHistoryStore()
</script>

<template>
  <NavBar :map="navigationMap(SectionKey.DailyHistory)" />
  <main>
    <section class="form">
      <ul>
        <!-- <div class="header">
          <span class="title">{{ dailyHistory.wordCount }} palabras</span>
        </div> -->
        <li 
          class="info"
          v-for="(word, index) of dailyHistory.words.sort()"
          :key="index"
        >
        {{ capitalCase(word.split(',')[0]) }}
        </li>
      </ul>
    </section>
  </main>
</template>

