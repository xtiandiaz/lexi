import { ref } from 'vue'
import { defineStore } from "pinia";
import { type Content } from '@/models/content';
import { type InputState } from '@/models/input';
import { Test } from '@/models/game';

export default defineStore('session', () => {
  const content = ref<Content>()
  const input = ref<InputState>()
  const test = ref<Test>()
  
  return {
    content,
    input,
    test
  }
})
