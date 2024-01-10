import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Data } from "../App";
import styles from "../SCSS/HourlyWeather.module.scss";

function getHourlyData(lat, lon) {
  return axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
}

export default function HourlyWeather() {
  const { setHourlyData, coordinates } = useContext(Data);
  const [hourlyArr, setHourlyArr] = useState([]);
  const coords = Array.isArray(coordinates) && coordinates;
  const lat = +coords[0];
  const lon = +coords[1];

  const { data, isLoading } = useQuery(
    ["hourlyWeather", lat, lon],
    () => getHourlyData(lat, lon),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    }
  );

  //* ============================= formate hour
  function formateDate(date, timezone) {
    const dates = new Date((date + timezone) * 1000);
    const hours = dates.getUTCHours();
    const period = hours >= 12 ? "PM" : "AM";
    return `${hours % 12 || 12}${period}`;
  }
  //* ================================= Get Specific Data from api

  useEffect(() => {
    const getHourlyWeather = data?.data?.list.slice(0, 8).map((item) => ({
      date: formateDate(item?.dt, data?.data?.city?.timezone),
      icon: item?.weather[0]?.icon,
      temp: item?.main?.temp,
      description: item?.weather[0]?.description,
    }));

    setHourlyArr(getHourlyWeather);
  }, [data]);

  //* =============================== Send data to Hourly Weather2
  useEffect(() => {
    setHourlyData({ hourlyArr, isLoading });
  }, [setHourlyData, hourlyArr, isLoading]);

  return (
    <div className={styles.hourlyWeather}>
      <p className={styles.hourlyTitle}>Today at</p>
      <div className={styles.hourlyWeather_Data}>
        {isLoading ? (
          <div className={styles.skeletonContainer}>
            {Array.from({ length: 8 }, (_, i) => (
              <Skeleton
                key={i}
                width={80}
                height={120}
                style={{ borderRadius: "2rem" }}
              />
            ))}
          </div>
        ) : (
          Array.isArray(hourlyArr) &&
          hourlyArr.map((item, i) => (
            <div className={styles.weatherBox} key={i}>
              <p className={styles.weather_Time}>{item?.date}</p>
              <img
                src={`public/weather_icons/${item?.icon}.png`}
                alt={item.description}
                className={styles.weather_Img}
              />
              <p className={styles.weather_Temp}>{`${Math.floor(
                item?.temp
              )}°`}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
