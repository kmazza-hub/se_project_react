// weatherApi.js

// Function to check the response from the weather API
const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

// Function to fetch weather data from OpenWeatherMap API
export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

// Function to filter and format weather data
export const filterWeatherData = (data) => {
  const result = {};
  const tempF = data.main.temp;
  result.city = data.name;
  result.temp = {
    F: tempF,
    C: Math.round((tempF - 32) * (5 / 9)),
  };
  result.type = getWeatherType(result.temp.F);
  return result;
};

// Helper function to categorize weather based on temperature
const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 85) {
    return "warm";
  } else {
    return "cold";
  }
};
