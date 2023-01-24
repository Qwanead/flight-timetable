<template>
  <button
    :class="[
      'base-button',
      {
        'base-button--disabled': disabled,
      },
    ]"
    type="button"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>

</style>
