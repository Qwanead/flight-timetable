<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="base-modal"
    >
      <div
        class="base-modal__overlay"
        @click="$emit('hideModal')"
      />
      <div class="base-modal__panel">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['hideModal'],
});
</script>

<style lang="scss" scoped>
  .base-modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    font-size: 15px;
    z-index: 999;
    transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .base-modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.48)), rgba(9, 30, 66, 0.4);
    z-index: 999;
  }

  .base-modal__panel {
    box-sizing: border-box;
    max-height: 90vh;
    max-width: 80%;
    z-index: 999;
  }
</style>
