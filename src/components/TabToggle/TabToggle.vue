<template>
  <div class="tab-toggle">
    <label
      v-for="(toggleItem) in toggleList"
      :key="toggleItem.name"
    >
      {{ toggleItem.label }}
      <input
        v-model="currentValue"
        type="radio"
        :value="toggleItem.name"
        :checked="toggleItem.name === activeTab"
        :disabled="disabled"
      >
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

type ToggleItem = {
  label: string,
  name: string,
};

export default defineComponent({
  props: {
    toggleList: {
      type: Array as PropType<ToggleItem[]>,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['toggleTab'],

  data() {
    return {
      currentValue: '',
    };
  },

  watch: {
    currentValue(val) {
      this.$emit('toggleTab', val);
    },
  },

  methods: {
  },
});
</script>

<style scoped>
.tab-toggle {
  display: flex;
  gap: 10px;
}
</style>
