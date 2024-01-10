const baseUrl = import.meta.env.VITE_BASE_URL;
const baseUrl2 = import.meta.env.VITE_BASE_URL2;
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const url = {
  currentWeather: (lat, lon) =>
    `${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
  foreCast: (lat, lon) =>
    `${baseUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
  airPolution: (lat, lon) =>
    `${baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
  reverseGeo: (lat, lon) =>
    `${baseUrl2}/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`,
  geo: (query) => `${baseUrl2}/direct?q=${query}&limit=5&appid=${apiKey}`,
};
