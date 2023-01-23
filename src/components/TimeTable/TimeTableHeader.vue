<template>
  <div class="table-header">
    <span
      v-for="(headerItem, i) in headerItems"
      :key="i"
      :style="{ width: `${headerItem.width}px` }"
    >
      {{ headerItem.label }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Flight } from '@/types/Flight';

export type HeaderItemProperty = keyof Flight;

export type HeaderItem = {
  label: string,
  property: HeaderItemProperty,
  width: number,
};

export default defineComponent({
  props: {
    headerItems: {
      type: Array as PropType<HeaderItem[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.table-header {
  display: flex;
}
</style>
