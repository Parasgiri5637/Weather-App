import { url } from "./apiConfig";

export const apiPoint = {
  geo: (query) => url.geo(query),
  currentWeather: (lat, lon) => url.currentWeather(lat, lon),
  foreCast: (lat, lon) => url.foreCast(lat, lon),
  airPollution: (lat, lon) => url.airPollution(lat, lon),
  reverseGeo: (lat, lon) => url.reverseGeo(lat, lon),
};
