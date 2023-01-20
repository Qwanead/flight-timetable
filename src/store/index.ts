import { createStore } from 'vuex';
import api from '@/services/api';
import type Flight from '@/types/Flight';

type FlightRaw = { [uid: string]: Flight };

const initialState: { flights: Flight[] } = {
  flights: [],
};

const flightAdapter = (flightRaw: FlightRaw) => Object.entries(flightRaw)
  .map(([uid, flight]: [string, Flight]) => ({ uid, ...flight }));

export default createStore({
  state: initialState,

  getters: {
    getFlights: (state) => state.flights,
  },

  mutations: {
    setFlights(state, flights) {
      state.flights = flights;
    },
  },

  actions: {
    async getFlights({ commit }) {
      const flightRaw = await api.flight.getAll();
      commit('setFlights', flightAdapter(flightRaw));
    },

    async createFlight({ dispatch }, flightData: Flight) {
      await api.flight.create(flightData);
      await dispatch('getFlights');
    },

    async editFlight(
      { dispatch },
      { uid, flightData }: { uid: string, flightData: Flight },
    ) {
      await api.flight.edit(uid, flightData);
      await dispatch('getFlights');
    },

    async deleteFlight({ dispatch }, uid: string) {
      await api.flight.delete(uid);
      await dispatch('getFlights');
    },
  },
});

export type State = typeof initialState;
