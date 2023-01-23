<template>
  <ul class="time-table">
    <li>
      <TimeTableHeader :header-items="headerItems" />
    </li>

    <li v-for="(flight) in flights" :key="flight.uid">
      <TimeTableRow :flight="flight" :header-items="headerItems" />

      <TimeTableControls @edit="$emit('editItem', flight)" @delete="$emit('deleteItem', flight)" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimeTableRow from '@/components/TimeTable/TimeTableRow.vue';
import TimeTableHeader from '@/components/TimeTable/TimeTableHeader.vue';
import TimeTableControls from '@/components/TimeTable/TimeTableControls.vue';
import type { PropType } from 'vue';
import type { FlightWithUid } from '@/types/Flight';
import type { HeaderItem } from '@/components/TimeTable/TimeTableHeader.vue';

export default defineComponent({
  components: {
    TimeTableHeader,
    TimeTableRow,
    TimeTableControls,
  },

  props: {
    flights: {
      type: Array as PropType<FlightWithUid[]>,
      required: true,
    },
  },

  emits: ['editItem', 'deleteItem'],

  data() {
    return {
      headerItems: [
        {
          label: 'Номер рейса',
          property: 'flightNo',
          width: 200,
        },
        {
          label: 'Пункт назначения',
          property: 'destination',
          width: 200,
        },
        {
          label: 'Дата и время',
          property: 'date',
          width: 200,
        },
      ] as HeaderItem[],
    };
  },
});
</script>

<style scoped>
  .time-table {
    list-style: none;
    padding: 0;
  }
</style>
