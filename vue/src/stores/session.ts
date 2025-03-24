import { ref } from 'vue'
import { defineStore } from "pinia";
import { type Content } from '@/models/content';
import { type InputState } from '@/models/input';
import { GameMode } from '@/models/game';

export default defineStore('session', () => {
  const content = ref<Content>()
  const gameMode = ref<GameMode>(GameMode.Exploration)
  const input = ref<InputState>()
  
  return {
    content,
    gameMode,
    input
  }
})
