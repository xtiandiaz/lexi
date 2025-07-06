import { ref, computed } from 'vue'
import { defineStore } from "pinia";
import { type RawContent } from '@/models/content';
import { type InputState } from '@/models/input';
import { GameMode, Test } from '@/models/game';
import settingsStore from '@/stores/settings'
import { retrievedSavedSession } from '@/services/session-management';

export default defineStore('session', () => {
  const settings = settingsStore()
  
  const savedSession = retrievedSavedSession()
  const inputStates = ref<InputState[]>(savedSession?.inputStates ?? [])
  
  const content = ref<RawContent>()
  const inputState = computed<InputState | undefined>(
    () => inputStates.value.find(is => is.term.language === settings.preferredLanguage)
  )
  
  const test = ref<Test>()
  const gameMode = computed<GameMode>(() => test.value ? GameMode.Test : GameMode.Exploration)
  
  function setInputState(inputState: InputState) {
    const index = inputStates.value.findIndex(is => is.term.language === inputState.term.language)
    
    if (index >= 0) {
      inputStates.value[index] = inputState
    } else {
      inputStates.value.push(inputState)
    }
  }
  
  return {
    content,
    gameMode,
    inputState,
    inputStates,
    test,
    
    setInputState
  }
})
