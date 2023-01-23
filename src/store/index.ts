import { createStore } from 'vuex';
import api from '@/services/api';
import type { Flight, FlightWithUid } from '@/types/Flight';

type FlightRaw = { [uid: string]: Flight };

const initialState = {
  flights: [] as FlightWithUid[],
  isLoaded: false,
};

const flightAdapter = (flightRaw: FlightRaw): FlightWithUid[] => Object.entries(flightRaw)
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
    setIsLoaded(state, status) {
      state.isLoaded = status;
    },
  },

  actions: {
    async getFlights({ commit }) {
      commit('setIsLoaded', false);
      const flightRaw = await api.flight.getAll();
      commit('setFlights', flightAdapter(flightRaw));
      commit('setIsLoaded', true);
    },

    async createFlight({ dispatch }, flightData: Flight) {
      await api.flight.create(flightData);
      await dispatch('getFlights');
    },

    async editFlight({ dispatch }, flight: FlightWithUid) {
      const {
        uid, flightNo, destination, date, isArrival,
      } = flight;
      const flightData = {
        flightNo, destination, date, isArrival,
      };
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
