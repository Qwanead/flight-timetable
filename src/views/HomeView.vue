<template>
  <main>
    <h1>Hello, World!</h1>
    <button
      type="button"
      @click="btnClick"
    >
      Button
    </button>
    <p>
      {{ flights }}
    </p>
  </main>
</template>

<script lang="ts">
export default {
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
        airportName: 'City',
        date: Date.now(),
        isArrival: true,
      };
      await this.$store.dispatch('createFlight', flight);
    },
  },
};
</script>
