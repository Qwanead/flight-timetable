<template>
  <ul class="time-table">
    <li class="time-table__row">
      <TimeTableHeader :header-items="headerItems" />
    </li>

    <li
      v-for="(flight) in flights"
      :key="flight.uid"
      class="time-table__row"
    >
      <TimeTableRow :flight="flight" :header-items="headerItems" />

      <TimeTableControls
        v-if="isAdmin"
        @edit="$emit('editItem', flight)"
        @delete="$emit('deleteItem', flight)"
      />
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
    isAdmin: {
      type: Boolean,
      default: false,
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

  watch: {
    flights() {
      this.setDestinationLabel();
    },
  },

  created() {
    this.setDestinationLabel();
  },

  methods: {
    setDestinationLabel() {
      const target = this.headerItems
        .find((item) => item.property === 'destination');
      const isArrival = this.flights.every((flight) => flight.isArrival);
      if (target?.label) {
        target.label = isArrival ? 'Пункт вылета' : 'Пункт назначения';
      }
    },
  },
});
</script>

<style scoped>
  .time-table {
    list-style: none;
    padding: 0;
    width: fit-content;
    display: flex;
    gap: 3px;
    flex-direction: column;
  }

  .time-table__row {
    padding: 7px;
    display: flex;
    background-color: var(--color-dark-mute);
  }
</style>
