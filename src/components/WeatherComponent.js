import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WeatherComponent.css";

const WeatherComponent = ({ onWeatherData }) => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aafabfd66c6fe77ea05b0a9d9cb64f7c&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchData(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (weatherData && onWeatherData) {
      onWeatherData(weatherData.wind.speed, weatherData.wind.deg);
    }
  }, [weatherData, onWeatherData]);

  const getWeatherIcon = () => {
    if (!weatherData) return "";

    const weather = weatherData.weather[0].icon;
    return `https://openweathermap.org/img/wn/${weather}.png`;
  };

  const weatherIcon = getWeatherIcon();
  return (
    <div className="weather-container">
      {weatherData && (
        <>
          <h1 className="city-name">{weatherData.name}</h1>
          {weatherIcon && (
            <img
              className="weather-icon"
              src={weatherIcon}
              alt="Weather icon"
            />
          )}
          <h2 className="temperature">{Math.round(weatherData.main.temp)}°C</h2>
          <p className="weather-description">
            {weatherData.weather[0].description}
          </p>
          <p className="lat">Latitude: {weatherData.coord.lat} </p>
          <p className="lon">Longitude: {weatherData.coord.lon}</p>
          <p className="wind-speed">Wind speed: {weatherData.wind.speed} m/s</p>
          <p className="wind-speed">Wind direction: {weatherData.wind.deg}°</p>
          <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
          <p className="visibility">
            Visibility: {weatherData.visibility / 1000} km
          </p>
          <p className="pressure">Pressure: {weatherData.main.pressure} hPa</p>
        </>
      )}
    </div>
  );
};
export default WeatherComponent;
