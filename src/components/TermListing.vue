<script setup lang="ts">
import useSessionStore from '@/stores/session.store'
import VuetyForm from '@vueties/components/form/VuetyForm.vue';
import VuetyFormSection from '@vueties/components/form/VuetyFormSection.vue';
import TermFoldableRow from './form/TermFoldableRow.vue';
import VuetyNavigationalView from '@/vueties/views/VuetyNavigationalView.vue';

const session = useSessionStore()
</script>

<template>
  <div class="modal-background"></div>
  <aside>
    <VuetyNavigationalView :enablesCloseOption="true">
      <VuetyForm>
        <VuetyFormSection>
          <TermFoldableRow 
            v-for="(term, index) of session.terms.slice(0, session.explorationExtent)" 
            :key="index"
            :isUnfolded="false"
            :term="term"
          />
        </VuetyFormSection>
      </VuetyForm>
    </VuetyNavigationalView>
  </aside>
</template>

<style scoped lang="scss">
@use '@vueties/utils/vuetystrap' as vs;
@use '@vueties/views/styles' as view-styles;

aside {
  z-index: calc(view-styles.$modal-base-z-index + 1);
  @include vs.position(absolute, 0, 0, 0, 3rem);
  
  .vuety-navigational-view {
    
  }
  
  .vuety-form {
    max-width: 420px;
    @include vs.color-attribute('background-color', vs.$secondary-background-color);
  }
}
</style>
