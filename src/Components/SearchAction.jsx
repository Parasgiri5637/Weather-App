import { useState, useEffect } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "../SCSS/Nav.module.scss";

export default function SearchAction({
  toggleBtn,
  setSearchParam,
  setErrorMessage,
  lat,
  lon,
}) {
  const [location, setLocation] = useState([]);
  const [isCurrentLocationActive, setCurrentLocationActive] = useState(false);

  useEffect(() => {
    if (JSON.stringify(location) === JSON.stringify([+lat, +lon])) {
      setCurrentLocationActive(true);
    } else {
      setCurrentLocationActive(false);
    }
  }, [lat, lon, location]);

  function handleGeoLocation() {
    navigator && navigator.geolocation.getCurrentPosition(successFn, errorFn);
  }

  function successFn(position) {
    const { latitude, longitude } = position.coords;
    setLocation([latitude, longitude]);
    setSearchParam({ lat: latitude, lon: longitude });
    setCurrentLocationActive(true);
  }

  function errorFn(error) {
    console.log(error);
    if (error) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
  }

  return (
    <div className={styles.searchAction}>
      <span className={styles.searchIcon} onClick={toggleBtn}>
        <AiOutlineSearch className={styles.sIcon} />
      </span>
      <button
        className={`${styles.currentLocation} ${
          isCurrentLocationActive ? styles.activeLocation : ""
        }`}
        onClick={handleGeoLocation}
        disabled={isCurrentLocationActive}
      >
        <BiCurrentLocation size="2.2rem" />
        <p>Current Location</p>
      </button>
    </div>
  );
}
