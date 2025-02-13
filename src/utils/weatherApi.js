export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

const normalizeCondition = (condition) => {
  const mapping = {
    clear: "clear",
    rain: "rain",
    "light rain": "rain",
    "moderate rain": "rain",
    thunderstorm: "storm",
    drizzle: "rain",
    snow: "cloudy",
    mist: "cloudy",
    smoke: "cloudy",
    haze: "cloudy",
    dust: "cloudy",
    fog: "cloudy",
    sand: "cloudy",
    ash: "cloudy",
    squall: "cloudy",
    tornado: "storm",
    clouds: "cloudy",
  };
  return mapping[condition] || "cloudy"; 
};

const isDay = ({ sunrise, sunset }) => {
  const now = Math.floor(Date.now() / 1000); 
  return sunrise < now && now < sunset;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

export const filterWeatherData = (data) => {
  console.log("Raw Weather Data:", data);
  const result = {
    city: data.name,
    temp: { F: data.main.temp },
    type: getWeatherType(data.main.temp),
    condition: normalizeCondition(data.weather[0].main.toLowerCase()),
    isDay: isDay(data.sys),
  };
  console.log("Filtered Weather Data:", result);
  return result;
};
