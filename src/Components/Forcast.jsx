import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import { Data } from "../App";
import { weekDayNames, monthNames } from "../CustomeHook/useDateFormatter";

import styles from "../SCSS/Forcast.module.scss";

function getForcast(lat, lon) {
  return axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
}

export default function Forcast() {
  const { coordinates } = useContext(Data);
  const coords = Array.isArray(coordinates) && coordinates;
  const lat = +coords[0];
  const lon = +coords[1];

  const { data, isLoading } = useQuery(
    ["forcast", lat, lon],
    () => getForcast(lat, lon),
    {
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: 5000,
    }
  );

  const forcastList = Array.isArray(data?.data?.list) && data?.data?.list;

  const [forcastUpdate, setForcastUpdate] = useState([]);

  useEffect(() => {
    const tempForcastUpdate = [];
    for (let i = 7; i < forcastList.length; i += 8) {
      const {
        main: { temp_max },
        dt_txt,
        weather,
      } = forcastList[i];
      const [{ icon, description }] = weather;
      const date = new Date(dt_txt);
      const month = date.getMonth();
      const weekDay = date.getDay();

      tempForcastUpdate.push({
        temp_max,
        icon,
        description,
        weekDay,
        month,
        date,
      });
    }
    setForcastUpdate(tempForcastUpdate);
  }, [forcastList]);

  return (
    <>
      <p className={styles.forcastTitle}>5 Days Forecast</p>
      <div className={styles.forcast}>
        {isLoading && (
          <Skeleton
            count={5}
            height={28}
            style={{ marginBottom: "0.8em", borderRadius: "2rem" }}
          />
        )}
        {forcastUpdate.map((item, i) => (
          <div className={styles.forcastDays} key={i}>
            <div className={styles.forcastTemp}>
              <img
                src={`public/weather_icons/${item.icon}.png`}
                alt={item.description}
              />
              <p>{Math.floor(item.temp_max)}°</p>
            </div>
            <p className={styles.forcastDate}>
              {item.date.getDate()} {monthNames[item.month]}
            </p>
            <p className={styles.forcastDay}>{weekDayNames[item.weekDay]}</p>
          </div>
        ))}
      </div>
    </>
  );
}
