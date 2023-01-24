<template>
  <div class="base-input">
    <label
      class="base-input__label"
    >
      {{ label }}

      <input
        class="base-input__input"
        :type="type"
        :value="value"
        :checked="Boolean(value)"
        @input="updateInput"
      >
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'text' | 'checkbox'>,
      default: 'text',
      validator: (val: string) => ['text', 'checkbox'].includes(val),
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Boolean, Number],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },

  emits: ['updateInput'],

  methods: {
    updateInput(evt: Event) {
      const { value } = (evt.target as HTMLInputElement);
      const { checked } = (evt.target as HTMLInputElement);
      const result = this.type === 'text' ? value : checked;

      this.$emit('updateInput', { name: this.name, value: result });
    },
  },
});
</script>

<style scoped>

</style>
