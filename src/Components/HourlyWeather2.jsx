import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Data } from "../App";
import styles from "../SCSS/HourlyWeather.module.scss";

export default function HourlyWeather2() {
  const { hourlyData } = useContext(Data);
  const hourlyArr = hourlyData?.hourlyArr;
  const isLoading = hourlyData?.isLoading;

  return (
    <div className={styles.hourlyWeather2}>
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
