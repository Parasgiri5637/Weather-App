import { MdOutlineAir as Air } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext } from "react";

import { Data } from "../App";
import styles from "../SCSS/Highlights.module.scss";
import axios from "axios";

function getAirIndex(lat, lon) {
  return axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`
  );
}

export default function HighlightAirIndex() {
  const { coordinates } = useContext(Data);
  const coords = Array.isArray(coordinates) && coordinates;
  const lat = +coords[0];
  const lon = +coords[1];
  const {
    data,

    isLoading,
  } = useQuery(["air_Quality", lat, lon], () => getAirIndex(lat, lon), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
  const airIndexDetail = data?.data?.list[0]?.components;

  const airQuality = [
    {
      name: "PM25",
      num: airIndexDetail?.pm2_5,
    },
    {
      name: "SO2",
      num: airIndexDetail?.so2,
    },
    {
      name: "NO2",
      num: airIndexDetail?.no2,
    },
    {
      name: "O3",
      num: airIndexDetail?.o3,
    },
  ];

  const airIndexStatus = getAirIndexStatus(data?.data?.list[0]?.main?.aqi);

  //* Get Air Index Status
  function getAirIndexStatus(aqi) {
    if (aqi === 1) {
      return "Good";
    } else if (aqi === 2) {
      return "Fair";
    } else if (aqi === 3) {
      return "Moderate";
    } else if (aqi === 4) {
      return "Poor";
    } else {
      return "Very Poor";
    }
  }

  return (
    <div className={styles.airIndex}>
      <div className={styles.airIndexHeader}>
        <p className={styles.airIndexTitle}>Air Quality Index</p>
        {isLoading ? (
          <Skeleton width={100} height={20} style={{ borderRadius: "2rem" }} />
        ) : (
          <p className={styles.airIndexStatus}>{airIndexStatus}</p>
        )}
      </div>
      <div className={styles.airIndexDetails}>
        {isLoading ? (
          <Skeleton height={10} count={3} style={{ marginBottom: "0.5em" }} />
        ) : (
          <Air className={styles.airIcon} />
        )}
        {airQuality.map((item, i) =>
          isLoading ? (
            <Skeleton
              key={i}
              height={10}
              count={3}
              style={{ marginBottom: "0.5em" }}
            />
          ) : (
            <div className={styles.airIndexData} key={i}>
              <span className={styles.airIndexText}>{item.name}</span>
              <span className={styles.airIndexNum}>
                {item.num && item.num.toFixed(1)}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
