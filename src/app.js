function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature-id");
  let descriptionElement = document.querySelector("#weather-info-id");
  let humidityElement = document.querySelector("#humidity-id");
  let windElement = document.querySelector("#wind-id");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
}

let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
let city = "Berlin";

let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayTemperature);
