<template>
  <div class="table-row">
    <span
      v-for="(headerItem, i) in headerItems"
      :key="i"
      :style="{ width: `${headerItem.width}px` }"
    >
      {{ flight[headerItem.property] }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { FlightWithUid } from '@/types/Flight';
import type { HeaderItem } from '@/components/TimeTable/TimeTableHeader.vue';

export default defineComponent({
  props: {
    flight: {
      type: Object as PropType<FlightWithUid>,
      required: true,
    },
    headerItems: {
      type: Array as PropType<HeaderItem[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
  .table-row {
    display: flex;
  }
</style>
