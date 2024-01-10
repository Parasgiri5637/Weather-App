import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

import DisplayResult from "../Components/DisplayResult";
import { Data } from "../App";

import useInitialLocation from "../CustomeHook/useInitialLocation";
import SearchAction from "../Components/SearchAction";

import styles from "../SCSS/Nav.module.scss";
import { DebounceInput } from "react-debounce-input";
import useError from "../CustomeHook/useError";

function getCityName(query) {
  return axios.get(
    `${import.meta.env.VITE_BASE_URL2}/direct?q=${query}&limit=5&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
}

const initialState = {
  mobileSearchView: false,
  cityName: "",
  searchResult: [],
  isHide: true,
  isBGColor: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "toggleBtn":
      return { ...state, mobileSearchView: !state.mobileSearchView };
    case "getCityName":
      return { ...state, cityName: action.payload };
    case "emptyInput":
      return { ...state, cityName: action.payload };
    case "getSearchResult":
      return { ...state, searchResult: action.payload };
    case "setIsHide":
      return { ...state, isHide: action.payload };
    case "handleToggle":
      return { ...state, mobileSearchView: action.payload };
    case "setIsBGColor":
      return { ...state, isBGColor: action.payload };

    default:
      return state;
  }
}

export default function Nav() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mobileSearchView, cityName, searchResult, isHide, isBGColor } = state;
  const [searchParam, setSearchParam] = useSearchParams();
  const { setCoordinates, setErrorMessage } = useContext(Data);

  //* use useSearchParam hook to extract lat and lon from URL

  const lat = searchParam.get("lat");
  const lon = searchParam.get("lon");
  console.log(lat, lon);
  

  //* For Mobile View to show search Bar
  function toggleBtn() {
    dispatch({ type: "toggleBtn" });
  }

  //* Filter Search Result
  const filterCity = searchResult.filter((item) =>
    item.name.toLowerCase().includes(cityName.toLowerCase())
  );

  //* Fetch Data
  const {
    data,
    isLoading,
    isError: geoError,
    error,
  } = useQuery(["cityName", cityName], () => getCityName(cityName), {
    refetchOnWindowFocus: false,
    enabled: !!cityName,
    refetchOnReconnect: true,
  });

  //* Fetch data for the initial location */
  useInitialLocation(lat, lon, cityName, setSearchParam, getCityName);

  //* ====================== 404 Error handlling
  useError(geoError, error, setErrorMessage);

  //* useEffect for extract needed data from api
  useEffect(() => {
    const newResult =
      data && data.data
        ? data?.data.map((item) => ({
            name: item.name,
            country: item.country,
            state: item.state,
            lat: item.lat,
            lon: item.lon,
          }))
        : [];
    dispatch({ type: "getSearchResult", payload: newResult });
  }, [cityName, data]);

  function handleCityName(e) {
    dispatch({
      type: "getCityName",
      payload: e.target.value,
    });
    dispatch({ type: "setIsHide", payload: false });
  }

  //* useEffect for send data to App Component so we can share Coordinates to all other component
  useEffect(() => {
    const coords = [lat, lon];

    if (coords) {
      setCoordinates(coords);
    } else {
      setCoordinates([22.6708, 71.5724]);
    }
  }, [lat, lon, setCoordinates]);

  //*========================================== Handle Submit

  function handleOnSubmit(e) {
    e.preventDefault();
    if (cityName) {
      dispatch({ type: "emptyInput", payload: "" });
      dispatch({ type: "handleToggle", payload: false });

      getCityName(cityName).then((result) => {
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
  }

  //* =================================== Active Nav Background Color
  function addBackGroundcolor() {
    if (window.scrollY >= 25) {
      dispatch({ type: "setIsBGColor", payload: true });
    } else {
      dispatch({ type: "setIsBGColor", payload: false });
    }
  }
  window.addEventListener("scroll", addBackGroundcolor);

  return (
    <header className={styles.header}>
      <div
        className={`${styles.navContainer} ${
          isBGColor ? styles.activeNav : ""
        }`}
      >
        <img src="public/logo.png" alt="logo" />

        <div
          className={`${styles.searchBar} ${
            mobileSearchView ? styles.open : ""
          }`}
        >
          <form
            className={`${styles.searchInput} ${
              isLoading ? cityName && styles.activeSpin : ""
            }`}
            onSubmit={handleOnSubmit}
          >
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              type="text"
              placeholder="Search for a city..."
              value={cityName}
              onChange={handleCityName}
              className={
                isHide ? "" : !isLoading && cityName && styles.activeInput
              }
            />
            <AiOutlineSearch className={styles.searchInputIcon} />
            <BiArrowBack className={styles.arrowBack} onClick={toggleBtn} />
          </form>
          {/* ----------------- Display search result ------------- */}
          <DisplayResult
            cityName={cityName}
            filterCity={filterCity}
            isLoading={isLoading}
            isHide={isHide}
            setIsHide={dispatch}
            emptyInput={dispatch}
            handleToggle={dispatch}
          />
        </div>

        {/* ----------------- Search Action ------------- */}
        <SearchAction
          toggleBtn={toggleBtn}
          setSearchParam={setSearchParam}
          lat={lat}
          lon={lon}
        />
      </div>
    </header>
  );
}
