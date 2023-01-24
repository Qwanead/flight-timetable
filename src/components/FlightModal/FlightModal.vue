<template>
  <BaseModal :is-open="isOpen" @hide-modal="$emit('hideModal')">
    <form class="flight-modal" @submit.stop="">
      <BaseInput
        name="flightNo"
        label="Номер рейса"
        :value="currentFlight.flightNo"
        @update-input="updateInput"
      />

      <BaseInput
        name="destination"
        :label="`Пункт ${currentFlight.isArrival ? 'вылета' : 'назначения'}`"
        :value="currentFlight.destination"
        @update-input="updateInput"
      />

      <BaseInput
        name="dateStr"
        label="Дата(в формате дд.мм.гггг)"
        :value="currentFlight.dateStr"
        @update-input="updateInput"
      />

      <BaseInput
        name="timeStr"
        label="Время(в формате чч:мм)"
        :value="currentFlight.timeStr"
        @update-input="updateInput"
      />

      <BaseButton @click="saveItem">
        Сохранить
      </BaseButton>
    </form>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import copyObj from '@/utils/copyObj';
import getDateStr, { getTimeStr } from '@/utils/getDateStr';

import type { PropType } from 'vue';
import type { FlightWithUid } from '@/types/Flight';

export default defineComponent({
  components: {
    BaseModal,
    BaseInput,
    BaseButton,
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    flight: {
      type: Object as PropType<FlightWithUid>,
      required: true,
    },
  },

  emits: ['hideModal', 'saveItem'],

  data() {
    return {
      currentFlight: {} as { [str: string]: string | number | boolean },
    };
  },

  watch: {
    flight() {
      this.copyFlight();
    },
  },

  created() {
    this.copyFlight();
  },

  methods: {
    copyFlight() {
      this.currentFlight = copyObj(this.flight);
      this.currentFlight.dateStr = getDateStr(this.flight.date, true);
      this.currentFlight.timeStr = getTimeStr(this.flight.date);
    },

    updateInput(data: { name: string, value: string }) {
      const { name, value } = data;
      this.currentFlight[name] = value;
    },

    getFlight() {
      const {
        uid, flightNo, destination, dateStr, timeStr, isArrival,
      } = this.currentFlight;
      const [DD, MM, YYYY] = (dateStr as string).split('.').map(Number);
      const [hh, mm] = (timeStr as string).split(':').map(Number);

      const date = new Date(0);
      date.setDate(DD);
      date.setFullYear(YYYY);
      date.setHours(hh);
      date.setMinutes(mm);
      date.setMonth(MM - 1);

      return {
        uid, flightNo, destination, date: date.getTime(), isArrival,
      };
    },

    saveItem() {
      this.getFlight();
      this.$emit('saveItem', this.getFlight());
    },
  },
});
</script>

<style scoped>

</style>
