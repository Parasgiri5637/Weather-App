import { useContext } from "react";
import { BsSunFill as Sun } from "react-icons/bs";
import { RiMoonFill as Moon } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Data } from "../App";
import styles from "../SCSS/Highlights.module.scss";
import useTimeFormatter from "../CustomeHook/useTimeFormatter";

export default function HighlightSunTime() {
  const { basicData } = useContext(Data);

  const sunRice = basicData?.sys?.sunrise;
  const sunSet = basicData?.sys?.sunset;
  const timezone = basicData?.timezone;

  return (
    <div className={styles.sunTime}>
      <p className={styles.sunTimeTitle}>Sunrice & Sunset</p>
      <div className={styles.sunTimeDetails}>
        {sunRice ? (
          <div className={styles.sunTimeBox}>
            <Sun className={styles.sunTimeIcon} />
            <div className={styles.sunRiceData}>
              <span className={styles.sunTimeText}>Sunrise</span>
              <span className={styles.sunTimeDate}>
                {useTimeFormatter({ time: sunRice, timezone })}
              </span>
            </div>
          </div>
        ) : (
          <Skeleton count={3} height={15} style={{ marginBottom: "0.5em" }} />
        )}
        {sunSet ? (
          <div className={styles.sunTimeBox}>
            <Moon className={styles.sunTimeIcon} />
            <div className={styles.sunSetData}>
              <span className={styles.sunTimeText}>Sunset</span>
              <span className={styles.sunTimeDate}>
                {useTimeFormatter({ time: sunSet, timezone })}
              </span>
            </div>
          </div>
        ) : (
          <Skeleton count={3} height={15} style={{ marginBottom: "0.5em" }} />
        )}
      </div>
    </div>
  );
}
