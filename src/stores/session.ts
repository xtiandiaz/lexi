import { ref, computed } from 'vue'
import { defineStore } from "pinia";
import type { RawContent } from '@/models/content';
import type { InputState } from '@/models/input';
import { GameMode, Test } from '@/models/game';
import { retrievedSavedSession } from '@/services/session-management';

export default defineStore('session', () => {  
  const savedSession = retrievedSavedSession()
  
  const content = ref<RawContent>()
  const inputState = ref<InputState | undefined>(savedSession?.inputState)
  
  const test = ref<Test>()
  const gameMode = computed<GameMode>(() => test.value ? GameMode.Test : GameMode.Exploration)
  
  return {
    content,
    gameMode,
    inputState,
    test,
  }
})
