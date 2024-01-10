import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { useState, createContext } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { Offline, Online } from "react-detect-offline";

import Nav from "./Components/Nav";
import CurrentWeather from "./Components/CurrentWeather";
import Forcast from "./Components/Forcast";
import Highlights from "./Components/Highlights";
import HourlyWeather from "./Components/HourlyWeather";
import HourlyWeather2 from "./Components/HourlyWeather2";
import Footer from "./Components/Footer";
import Error from "./Components/Error";

import "./index.scss";

export const Data = createContext();

function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [basicData, setBasicData] = useState();
  const [hourlyData, setHourlyData] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const queryClient = new QueryClient();
  console.log(errorMessage?.errors);
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Data.Provider
            value={{
              setCoordinates,
              coordinates,
              setBasicData,
              basicData,
              hourlyData,
              setHourlyData,
              setErrorMessage,
            }}
          >
            <>
              <Nav />
              {errorMessage?.errors && <Error errorMessage={errorMessage} />}
              {!errorMessage?.errors && (
                <Online>
                  <main className="main">
                    <div className="left_Content">
                      <CurrentWeather />
                      <Forcast />
                    </div>
                    <div className="right_Content">
                      <Highlights />
                      <HourlyWeather />
                    </div>
                  </main>
                  <HourlyWeather2 />
                </Online>
              )}
              <Offline>
                <Error />
              </Offline>
              <Footer />
            </>
          </Data.Provider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
