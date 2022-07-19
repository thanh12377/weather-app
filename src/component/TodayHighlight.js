import React from "react";

const TodayHighlight = ({ today }) => {
  const getDirection = (e) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(e / 45) % 8];
  };

  return (
    <div className="highlight-today">
      <h2>Today's Highlights</h2>
      <div className="all-highlight">
        <div className="highlight">
          <p>Wind Status</p>
          <p className="highlight-main">
            <span>{today.windSpeed}</span> mph
            <p>
              <span
                className="material-icons direction"
                style={{
                  transform: `rotate(${parseInt(today.windDirection)}deg)`,
                }}
              >
                navigation
              </span>
              {getDirection(parseInt(today.windDirection))}
            </p>
          </p>
        </div>
        <div className="highlight">
          <p>Humidity</p>
          <p className="highlight-main">
            {" "}
            <span>{today.humidity}</span> %
          </p>
          <div className="percentages">
            <p>0</p>
            <p>50</p>
            <p>100</p>
          </div>
          <div className="container">
            <span className="humidity" style={{width: `${parseInt(today.humidity)}%`}}></span>
          </div>
        </div>
        <div className="highlight">
          <p>Cloud Cover</p>
          <p className="highlight-main">
            <span>{today.cloudCover}</span>%
          </p>
        </div>
        <div className="highlight">
          <p>Air Pressure</p>
          <p className="highlight-main">
            <span>{parseInt(today.pressure)}</span>mb
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayHighlight;
