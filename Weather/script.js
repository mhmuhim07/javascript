document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorDisplay = document.getElementById("error-message");

  const API_KEY = "WD6BVYF4BQMD9BWTLU6QF955R";

  getBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    try {
      const weatherData = await getData(city);
      displayData(weatherData);
    } catch (error) {
      error();
    }
    cityInput.value = "";
  });

  async function getData(city) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=current&key=${API_KEY}&contentType=json`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }
  function displayData(data) {
    cityName.textContent = data.address;
    temperature.textContent = `Temperature: ${data.currentConditions.temp} F`;
    description.textContent = `weather: ${data.currentConditions.conditions}`;
    weatherInfo.classList.remove("hidden");
  }

  function error() {
    weatherInfo.classList.add("hidden");
    errorDisplay.classList.remove("hidden");
  }
});
