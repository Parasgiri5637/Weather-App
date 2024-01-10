import { useEffect } from "react";

export default function useInitialLocation(
  lat,
  lon,
  cityName,
  setSearchParam,
  getCityName
) {
  useEffect(() => {
    if (!lat && !lon && !cityName) {
      getCityName("gujarat").then((result) => {
        const { data } = result;
        const coords =
          Array.isArray(data) &&
          data.map((item) => ({
            lat: item.lat,
            lon: item.lon,
          }));
        setSearchParam({ lat: coords[0].lat, lon: coords[0].lon });
      });
    }
  }, [cityName, lat, lon, setSearchParam, getCityName]);
}
