import React from "react";
import axios from "axios";
import { useEffect } from "react";

const RenderWeather = (props) => {
  const hook = () =>
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${props.api_key}`
      )
      .then((response) => {
        const apiResponse = response.data;
        const temp = (apiResponse.main.temp - 273.1).toFixed(2);
        props.setWeather(temp);
        props.setWeatherIcon(response.data.weather[0].icon);
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(hook, []);

  return (
    <div>
      {props.weather ? (
        <div>
          <p>
            <img
              alt="Weather icon"
              src={`http://openweathermap.org/img/wn/${props.weatherIcon}@2x.png`}
            />
          </p>
          Weather in {props.capital} is {props.weather} degrees celsius
        </div>
      ) : null}
    </div>
  );
};

export default RenderWeather;
