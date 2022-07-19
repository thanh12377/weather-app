import React from "react";

const Forecast = ({forecast, tempType}) =>{
    return (
        <div className="week-forecast">
            {forecast.map((day,key) => {
                console.log(forecast.length)
                return (
                    <div className="day" key = {key}>
                        <p>{day.date}</p>
                        <img alt='' style={{width: '100%', maxWidth: '75px', height:'auto'}} src={require("../images/"+day.condition+".png")} />
                        {tempType ==='C' ?
                        <div className="temps">
                            <p>{parseInt(day.maxTemp)}&deg;C</p>
                            <p className="min">{parseInt(day.minTemp)}&deg;C</p>
                        </div>
                        :
                        <div className="temps">
                            <p>{parseInt(day.maxTemp*1.8)+32}&deg;F</p>
                            <p className="min">{parseInt(day.minTemp*1.8)+32}&deg;F</p>
                        </div>
            }
                    </div>
                )
            })}
        </div>
    )
};

export default Forecast;