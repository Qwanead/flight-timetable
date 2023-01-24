<template>
  <div class="table-row">
    <span
      v-for="(headerItem, i) in headerItems"
      :key="i"
      :style="{ width: `${headerItem.width}px` }"
    >
      <template v-if="headerItem.property === 'date'">
        {{ getDateStr(flight[headerItem.property]) }}
      </template>

      <template v-else>
        {{ flight[headerItem.property] }}
      </template>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import getDateStr from '@/utils/getDateStr';

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

  data() {
    return {
      getDateStr,
    };
  },
});
</script>

<style scoped>
  .table-row {
    display: flex;
  }
</style>
