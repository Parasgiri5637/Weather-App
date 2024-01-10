import { useSearchParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { useContext, useEffect } from "react";

import { Data } from "../App";
import styles from "../SCSS/Nav.module.scss";

export default function DisplayResult({
  cityName,
  filterCity,
  isLoading,
  setIsHide,
  isHide,
  emptyInput,
  handleToggle,
}) {
  const [searchParam, setSearchParam] = useSearchParams();
  const { setCoordinates } = useContext(Data);
  const lat = searchParam.get("lat");
  const lon = searchParam.get("lon");

  useEffect(() => {
    const coord = [lat, lon];
    setCoordinates(coord);
  }, [lat, lon, setCoordinates]);

  function handleSearchParam(item) {
    setSearchParam({ lat: item.lat, lon: item.lon });
    setIsHide({ type: "setIsHide", payload: true });
    emptyInput({ type: "emptyInput", payload: "" });
    handleToggle({ type: "handleToggle", payload: false });
  }

  return (
    <div
      className={
        isHide
          ? styles.hideResult
          : cityName && !isLoading
          ? styles.searchResult
          : styles.hideResult
      }
    >
      {cityName && !filterCity.length && !isLoading && <NotFound />}

      {Array.isArray(filterCity) &&
        filterCity.map((item, i) => (
          <div
            className={styles.searchList}
            key={i}
            onClick={() => handleSearchParam(item)}
          >
            <MdLocationOn className={styles.resultLocation} />
            <ul className={styles.searchDetails}>
              <li className={styles.city}>{item.name}</li>
              <li className={styles.country}>
                {item.state},{item.country}
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}

function NotFound() {
  return <p className={styles.notFound}>No Matches</p>;
}
