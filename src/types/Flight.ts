export type Flight = {
  flightNo: string,
  destination: string,
  date: number,
  isArrival: boolean,
};

export type FlightWithUid = Flight & {
  uid: string,
};
