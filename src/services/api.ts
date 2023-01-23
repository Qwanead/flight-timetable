import httpRequest from '@/services/httpRequest';
import type { Flight } from '@/types/Flight';

const BASE_URL = 'https://flight-timetable-642b8-default-rtdb.firebaseio.com/flights';

const flight = {
  getAll() {
    const url = `${BASE_URL}.json`;
    return httpRequest({ url, method: 'GET' });
  },

  create(flightData: Flight) {
    const url = `${BASE_URL}.json`;
    return httpRequest({ url, method: 'POST', body: flightData });
  },

  edit(uid: string, flightData: Flight) {
    const url = `${BASE_URL}/${uid}.json`;
    return httpRequest({ url, method: 'PATCH', body: flightData });
  },

  delete(uid: string) {
    const url = `${BASE_URL}/${uid}.json`;
    return httpRequest({ url, method: 'DELETE' });
  },
};

const api = { flight };

export default api;
