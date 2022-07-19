import React from "react";
import { Fragment, useState } from "react";

const Today = ({
  today,
  tempType,
  location,
  getLocation,
  setLocation,
  setCoordinates,
}) => {
  const [overlay, setOverlay] = useState(false);
  const [cityList, setCityList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
        e.target.city.value
    )
      .then((response) => response.json())
      .then((data) => {
        setCityList(data.results);
      });
  };

  const handleClick = (city) => {
    setCoordinates({
      lat: city.latitude,
      long: city.longitude,
    });
    setLocation(city.name + ", " + city.country);
    setOverlay(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="sidebar">
        <div className="search-buttons">
          <button
            className="search-place"
            onClick={() => {
              setOverlay(true);
              document.body.style.overflow = "hidden";
            }}
          >
            Search for places
          </button>
          <button className="search-button">
            <span className="material-icons" onClick={()=>getLocation()}>my_location</span>
          </button>
        </div>
        <div className="weather-icon">
          <img
            src={
              today.condition
                ? require("../images/" + today.condition + ".png")
                : require("../images/Shower.png")
            }
            alt=""
          />
        </div>
        {tempType === "C" ? (
          <h1 className="text">
            <span className="temperature">{parseInt(today.temperature)}</span>
            &deg;C
          </h1>
        ) : (
          <h1 className="text">
            <span className="temperature">
              {parseInt(today.temperature * 1.8) + 32}
            </span>
            &deg;F
          </h1>
        )}
        <h2 className="condition text">{today.condition}</h2>
        <div>
          <p className="text">Today &bull; {today.date}</p>
          <p className="text">
            <span className="material-icons">location_on</span>
            {location}
          </p>
        </div>
        <div className={overlay ? "overlay active" : "overlay"}>
          <div className="close-btn">
            <span
              className="material-icons "
              onClick={() => {
                setOverlay(false);
                document.body.style.overflow = "auto";
              }}
            >
              close
            </span>
          </div>
          <form className="search-location" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <span className="material-icons">search</span>
              <input
                type="text"
                placeholder="search location"
                name="city"
              ></input>
            </div>
            <button type="submit">Search</button>
          </form>
          {cityList.map((city, key) => {
            return (
              <button
                key={key}
                className="city-button"
                onClick={() => {
                  handleClick(city);
                }}
              >
                {city.name}, {city.admin1}, {city.country}
                <span className="material-icons">navigate_next</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Today;
