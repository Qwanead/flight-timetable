<template>
  <main class="home-view">
    <div class="home-view__header">
      <BaseButton v-if="isAdmin" @click="openCreateFlightModal">
        Создать
      </BaseButton>

      <TabToggle
        :toggle-list="toggleList"
        :active-tab="activeTab"
        @toggle-tab="changeActiveTab"
      />

      <BaseInput
        type="checkbox"
        name="isAdmin"
        label="Режим Админа"
        :value="isAdmin"
        @update-input="adminModeToggle"
      />
    </div>

    <div class="home-view__search">
      <BaseInput
        name="flightNo"
        label="Номер рейса"
        :value="filter.flightNo"
        @update-input="updateFilter"
      />

      <BaseInput
        name="destination"
        :label="`Пункт ${filter.isArrival ? 'вылета' : 'назначения'}`"
        :value="filter.destination"
        @update-input="updateFilter"
      />
    </div>

    <TimeTable
      :flights="flights"
      :is-admin="isAdmin"
      @edit-item="openEditFlightModal"
      @delete-item="deleteItem"
    />

    <FlightModal
      :is-open="isFlightModalOpen"
      :flight="flightModalData"
      @hide-modal="isFlightModalOpen = false"
      @save-item="saveItem"
    />
  </main>
</template>

<script lang="ts">
import TimeTable from '@/components/TimeTable/TimeTable.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import FlightModal from '@/components/FlightModal/FlightModal.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import TabToggle from '@/components/TabToggle/TabToggle.vue';

import copyObj from '@/utils/copyObj';

import type { FlightWithUid } from '@/types/Flight';

type ActiveTab = 'arrival' | 'departure';

export default {
  components: {
    TimeTable,
    BaseButton,
    FlightModal,
    BaseInput,
    TabToggle,
  },

  data() {
    return {
      isFlightModalOpen: false,
      newFlightData: {
        uid: '',
        flightNo: '',
        destination: '',
        date: 0,
        isArrival: true,
      } as FlightWithUid,
      flightModalData: {} as FlightWithUid,
      activeTab: 'arrival' as ActiveTab,
      isAdmin: false,
      filter: {
        flightNo: '',
        destination: '',
        isArrival: true,
      } as { [str: string]: string | boolean },
      toggleList: [
        {
          label: 'Прибывающие',
          name: 'arrival',
        },
        {
          label: 'Убывающие',
          name: 'departure',
        },
      ],
    };
  },

  computed: {
    flights() {
      return this.$store.getters.getFlights(this.filter);
    },
  },

  created() {
    this.$store.dispatch('getFlights');

    if (this.$route.name === 'home') {
      this.$router.push(`/${this.activeTab}`);
    } else {
      this.changeActiveTab(this.$route.name as ActiveTab);
    }

    if (this.$route.query.isAdmin) {
      this.isAdmin = this.$route.query.isAdmin === 'true';
    }
  },

  methods: {
    async createItem(flight: FlightWithUid) {
      const {
        flightNo,
        destination,
        date,
        isArrival,
      } = flight;
      await this.$store.dispatch('createFlight', {
        flightNo,
        destination,
        date,
        isArrival,
      });
    },

    async editItem(flight: FlightWithUid) {
      await this.$store.dispatch('editFlight', flight);
    },

    async deleteItem(flight: FlightWithUid) {
      await this.$store.dispatch('deleteFlight', flight.uid);
    },

    saveItem(flight: FlightWithUid) {
      if (flight.uid === '') {
        this.createItem(flight);
      } else {
        this.editItem(flight);
      }
      this.isFlightModalOpen = false;
    },

    openCreateFlightModal() {
      this.flightModalData = copyObj(this.newFlightData);
      this.flightModalData.date = Date.now();
      this.flightModalData.isArrival = this.activeTab === 'arrival';
      this.isFlightModalOpen = true;
    },

    openEditFlightModal(flight: FlightWithUid) {
      this.flightModalData = flight;
      this.isFlightModalOpen = true;
    },

    changeActiveTab(tabName: ActiveTab) {
      this.activeTab = tabName;
      this.filter.isArrival = tabName === 'arrival';
      this.$router.push({
        name: tabName,
        query: { isAdmin: String(this.isAdmin) },
      });
    },

    adminModeToggle({ value }: { value: boolean }) {
      this.isAdmin = value;
      this.$router.push({
        name: this.$route.name as string,
        query: { isAdmin: String(value) },
      });
    },

    updateFilter(data: { name: string, value: string | boolean }) {
      const { name, value } = data;
      this.filter[name] = value;
    },
  },
};
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.home-view__header {
  display: flex;
  justify-content: space-between;
}

.home-view__search {
  display: flex;
  gap: 30px;
}
</style>
