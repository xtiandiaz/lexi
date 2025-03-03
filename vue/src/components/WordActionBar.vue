<script setup lang="ts">
defineProps<{
  word?: string
}>()

const emits = defineEmits<{
  launchMeaning: [sourceURL: string]
}>()

enum WordAction {
  Define, 
  Search,
  SearchForImages
}

function runWordAction(action: WordAction, word: string | undefined): void {
  if (word === undefined) {
    return
  }
  
  const url = (() => {
    switch (action) {
      case WordAction.Define:
        return `https://dle.rae.es/${word}`
      case WordAction.Search:
        return `https://duckduckgo.com/?t=ffab&q=${word}`
      case WordAction.SearchForImages:
        return `https://duckduckgo.com/?t=ffab&q=${word}&iax=images&ia=images`
    }
  })()
  
  emits('launchMeaning', url)
  
}
</script>

<template>
  <div class="button-bar" v-show="word !== undefined">
    <button class="iconized" @click="runWordAction(WordAction.Define, word)">
      <span class="icon define"></span>
    </button>
    <button class="iconized" @click="runWordAction(WordAction.Search, word)">
      <span class="icon search"></span>
    </button>
    <button class="iconized" @click="runWordAction(WordAction.SearchForImages, word)">
      <span class="icon search-images"></span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use './../assets/design-tokens/iconography';

.icon {
  &.define {
    @include iconography.colored-icon-content-attribute('dictionary', 'blue');
  }
  &.search {
    @include iconography.colored-icon-content-attribute('globe', 'indigo');
  }
  &.search-images {
    @include iconography.colored-icon-content-attribute('image', 'purple');
  }
}
</style>
