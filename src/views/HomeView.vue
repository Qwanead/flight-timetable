<template>
  <main>
    <button
      type="button"
      @click="btnClick"
    >
      Button
    </button>

    <TimeTable
      :flights="flights"
      @edit-item="editItem"
      @delete-item="deleteItem"
    />
  </main>
</template>

<script lang="ts">
import TimeTable from '@/components/TimeTable/TimeTable.vue';
import type { FlightWithUid } from '@/types/Flight';

export default {
  components: {
    TimeTable,
  },

  computed: {
    flights() {
      return this.$store.getters.getFlights;
    },
  },

  created() {
    this.$store.dispatch('getFlights');
  },

  methods: {
    async btnClick() {
      const flight = {
        flightNo: 'RF-1234',
        destination: 'City',
        date: Date.now(),
        isArrival: true,
      };
      await this.$store.dispatch('createFlight', flight);
    },

    async editItem(flight: FlightWithUid) {
      await this.$store.dispatch('editFlight', flight);
    },

    async deleteItem(flight: FlightWithUid) {
      await this.$store.dispatch('deleteFlight', flight.uid);
    },
  },
};
</script>
