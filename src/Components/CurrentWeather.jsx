import { useQuery } from "@tanstack/react-query";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { useContext, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Data } from "../App";
import useDateFormatter from "../CustomeHook/useDateFormatter";

import styles from "../SCSS/CurrentWeather.module.scss";

function getCurrentWeather(lat, lon) {
  return axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
}

export default function CurrentWeather() {
  const { coordinates, setBasicData } = useContext(Data);
  const coords = Array.isArray(coordinates) && coordinates;
  const lat = +coords[0];
  const lon = +coords[1];

  const { data } = useQuery(
    ["currentWeather", lat, lon],
    () => getCurrentWeather(lat, lon),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    }
  );

  const main = data?.data?.main;
  const description = data?.data?.weather[0]?.description;
  const icon = data?.data?.weather[0]?.icon;
  const name = data?.data?.name;
  const country = data?.data?.sys?.country;
  const date = data?.data?.dt;
  const timezone = data?.data?.timezone;
  const formattedDate = useDateFormatter({ date, timezone });

  useEffect(() => {
    setBasicData(data?.data);
  }, [setBasicData, data]);

  return (
    <div className={styles.currentWeather}>
      <p className={styles.temp}>Now</p>
      <div className={styles.currentTempBox}>
        <div className={styles.currentTempDetails}>
          {main ? (
            <p className={styles.currentTemp}>
              {Math.floor(main?.temp)}°<sup>c</sup>
            </p>
          ) : (
            <Skeleton count={3} height={15} style={{ marginBottom: "0.6em" }} />
          )}
          {icon ? (
            <img src={`public/weather_icons/${icon}.png`} alt="weather image" />
          ) : (
            <Skeleton
              circle
              height={60}
              style={{ marginBottom: "0.6em", marginLeft: "0.8em" }}
            />
          )}
        </div>

        <p className={styles.tempStatus}>{description || <Skeleton />}</p>
      </div>
      <div className={styles.currentTempSubDetails}>
        {date && timezone && formattedDate ? (
          <div className={styles.currentTempDate}>
            <MdDateRange className={styles.dateIcon} />
            <span className={styles.date}>{formattedDate}</span>
          </div>
        ) : (
          <Skeleton style={{ marginBottom: "0.6em" }} />
        )}
        {name && country ? (
          <div className={styles.currentTempCity}>
            <MdLocationOn className={styles.cityIcon} />
            <span className={styles.cityName}>
              {name},{country}
            </span>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
