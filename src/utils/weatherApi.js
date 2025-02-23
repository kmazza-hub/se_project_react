import { checkRes } from './api'; // Import the checkRes function from api.js

// Function to get weather data from OpenWeather API
export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then(checkRes) // Use checkRes to handle the response
    .catch((error) => {
      console.error("Failed to fetch weather data:", error);
      // Optionally, you can return a fallback value or handle the error more gracefully
    });
};

// Function to filter the weather data
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name; // City name
  result.temp = {
    F: Math.round(data.main.temp), // Temperature in Fahrenheit
    C: Math.round(((data.main.temp - 32) * 5) / 9), // Convert to Celsius
  };
  result.type = getWeatherType(result.temp.F); // Get the type of weather based on temperature
  result.condition = data.weather[0].main.toLowerCase(); // Weather condition (clear, rain, etc.)
  result.isDay = isDay(data.sys, Date.now()); // Check if it's day or night based on sunrise/sunset
  return result;
};

// Function to determine if it's day or night based on sunrise/sunset times
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000; // Compare the current time with sunrise/sunset
};

// Function to categorize the weather type based on the temperature in Fahrenheit
const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot"; // Above 86°F is considered hot
  } else if (temperature >= 66 && temperature < 86) {
    return "warm"; // Between 66°F and 86°F is considered warm
  } else {
    return "cold"; // Below 66°F is considered cold
  }
};
