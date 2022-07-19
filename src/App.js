import React from "react";
import { Fragment, useState, useEffect } from "react";
import Today from "./component/Today";
import Forecast from "./component/Forecast";
import "./App.scss";

function App() {
  const [today, setToday] = useState({});
  const [tempType, setTempType] = useState("C");
  const [coordinates, setCoordinates] = useState({
    lat: "10.82302",
    long: "106.62965",
  });
  const [location, setLocation] = useState("Ho Chi Minh, Viet Nam");
  const [forecast,setForecast] = useState([])

  

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
        )
          .then((response) => response.json())
          .then((data) => {
            setLocation(data.locality + ", " + data.countryCode);
          });
      });
    }
  };
  useEffect(() => {
    setForecast([]);
    getWeatherData();
    
  }, [coordinates]);
  
  const getWeatherData = async () => {
    await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}&hourly=temperature_2m,relativehumidity_2m,pressure_msl,weathercode,cloudcover,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&windspeed_unit=mph&timeformat=unixtime&timezone=Asia%2FVientiane`
    )
      .then((response) => response.json())
      .then((data) => {
        setToday({
          date: new Date(data.hourly.time[0] * 1000).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          temperature: data.hourly.temperature_2m[0],
          condition: getWeatherType(data.hourly.weathercode[0]),
          windSpeed: data.hourly.windspeed_10m[0],
          windDirection: data.hourly.winddirection_10m[0],
          humidity: data.hourly.relativehumidity_2m[0],
          pressure: data.hourly.pressure_msl[0],
          cloudCover: data.hourly.cloudcover[0],
        });
        for (let i = 1; i < 6; i++) {
          let newForecast = {
            date: "",
            condition: getWeatherType(data.daily.weathercode[i]),
            maxTemp: data.daily.temperature_2m_max[i],
            minTemp: data.daily.temperature_2m_min[i],
          };
          if (i === 1) {
            newForecast.date = "Tomorrow";
          } else {
            newForecast.date = new Date(
              data.daily.time[i] * 1000
            ).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });
          }
          setForecast(forecast => [...forecast,newForecast])
        }
      });
  };

  const getWeatherType = (code) => {
    if (1 <= code && code <= 3) {
      return "Light Cloud";
    } else if (45 <= code && code <= 48) {
      return "Heavy Cloud";
    } else if (51 <= code && code <= 55) {
      return "Light Rain";
    } else if (61 <= code && code <= 65) {
      return "Heavy Rain";
    } else if (66 <= code && code <= 67) {
      return "Sleet";
    } else if (71 <= code && code <= 75) {
      return "Snow";
    } else if (code === 77) {
      return "Hail";
    } else if (80 <= code && code <= 82) {
      return "Shower";
    } else if (95 <= code && code <= 99) {
      return "Thunderstorm";
    } else {
      return "Clear";
    }
  };
 
  console.log(tempType);
  console.log(today)
  return (
    <div className="App">
      <Today
        today={today}
        tempType={tempType}
        location={location}
        getLocation={getLocation}
        setLocation={setLocation}
        setCoordinates={setCoordinates}
      ></Today>
      <div className="main">
        <div className="degrees">
          <button
            className={
              tempType === "C" ? "degrees-button active" : "degrees-button"
            }
            onClick={() => setTempType("C")}
          >
            {" "}
            &deg;C
          </button>
          <button
            className={
              tempType === "F" ? "degrees-button active" : "degrees-button"
            }
            onClick={() => setTempType("F")}
          >
            {" "}
            &deg;F
          </button>
        </div>
      <Forecast forecast={forecast} tempType ={tempType}/>
      </div>
    </div>
  );
}

export default App;
