import { ref } from 'vue'
import { defineStore } from "pinia";
import { type InputState } from '@/models/input';

export default defineStore('session', () => {
  const input = ref<InputState>()
  
  return {
    input
  }
})
