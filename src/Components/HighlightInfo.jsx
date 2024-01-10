import { WiHumidity as Humidity } from "react-icons/wi";
import { PiWavesBold as Pressure } from "react-icons/pi";
import { MdOutlineVisibility as Visibility } from "react-icons/md";
import { LiaTemperatureLowSolid as FeelLike } from "react-icons/lia";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Data } from "../App";
import styles from "../SCSS/Highlights.module.scss";

export default function HighlightInfo() {
  const { basicData } = useContext(Data);
  const humidity = basicData?.main?.humidity;
  const pressure = basicData?.main?.pressure;
  const visibility = basicData?.visibility;
  const feels_like = basicData?.main?.feels_like;

  return (
    <>
      <div className={styles.infoBox}>
        <p className={styles.infoText}>Humidity</p>
        {humidity ? (
          <div className={styles.infoData}>
            <Humidity className={styles.infoIcon} />
            <span className={styles.infoNum}>{humidity}%</span>
          </div>
        ) : (
          <Skeleton count={3} height={15} style={{ marginBottom: "0.5em" }} />
        )}
      </div>
      <div className={styles.infoBox}>
        <p className={styles.infoText}>Pressure</p>
        {pressure ? (
          <div className={styles.infoData}>
            <Pressure className={styles.infoIcon} />
            <span className={styles.infoNum}>
              {pressure} <sub>hPa</sub>
            </span>
          </div>
        ) : (
          <Skeleton count={3} height={15} style={{ marginBottom: "0.5em" }} />
        )}
      </div>
      <div className={styles.infoBox}>
        <p className={styles.infoText}>Visibility</p>
        {visibility ? (
          <div className={styles.infoData}>
            <Visibility className={styles.infoIcon} />
            <span className={styles.infoNum}>{visibility / 1000}km</span>
          </div>
        ) : (
          <Skeleton count={3} height={15} style={{ marginBottom: "0.5em" }} />
        )}
      </div>
      <div className={styles.infoBox}>
        <p className={styles.infoText}>Feels Like</p>
        {feels_like ? (
          <div className={styles.infoData}>
            <FeelLike className={styles.infoIcon} />
            <span className={styles.infoNum}>
              {Math.floor(feels_like)}°<sup>c</sup>
            </span>
          </div>
        ) : (
          <Skeleton count={3} height={15} style={{ marginBottom: "0.5em" }} />
        )}
      </div>
    </>
  );
}
