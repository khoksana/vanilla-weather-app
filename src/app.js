function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes},`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let weatherForecastElement = document.querySelector("#weather-forecast-id");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
               <div class="weather-forecast-time">${formatDay(
                 forecastDay.dt
               )}</div>
               <img
                 src="http://openweathermap.org/img/wn/${
                   forecastDay.weather[0].icon
                 }@2x.png"
                 alt="${forecastDay.weather[0].main}"
                 width="80"
                 height="80"
                 class="weather-icon"
               />
               <div class="weather-forecast-temp">
                 <span class="weather-forecast-temp-max">${Math.round(
                   forecastDay.temp.max
                 )}° </span>
                 <span class="weather-forecast-temp-min">${Math.round(
                   forecastDay.temp.min
                 )}°</span>
               </div>
             </div>
           `;
    }
  });

  weatherForecastElement.innerHTML = forecastHTML + `</div>`;
}

function getForecast(coordinates) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(forecastURL);

  axios.get(forecastURL).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature-id");
  let descriptionElement = document.querySelector("#weather-info-id");
  let humidityElement = document.querySelector("#humidity-id");
  let windElement = document.querySelector("#wind-id");
  let dataElement = document.querySelector("#time");
  let iconElement = document.querySelector("#weather-icon-id");

  celsiusTemperature = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  dataElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input-id");
  search(cityInputElement.value);
}

function displayFahrenheitMetric(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-id");
  let fahrenheiTempereture = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheiTempereture);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function displayCelsiusMetric(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-id");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsiusTemperature = null;

let form = document.querySelector("#search-by-city");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit-id");
fahrenheit.addEventListener("click", displayFahrenheitMetric);

let celsius = document.querySelector("#celsius-id");
celsius.addEventListener("click", displayCelsiusMetric);

search("Berlin");
