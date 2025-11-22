import { GetWeather } from './services/weatherService.js';
import { Box } from './components/box.js';
import { Filter } from './utils/filter.js';
import { weatherCodes } from './utils/weatherCodes.js';

const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');
const filter = new Filter();
const weatherService = new GetWeather(filter);


async function searching() {
    let city = searchField.value;
    searchField.value = '';
    const weather = await weatherService.getWeatherCity(city);
    if (!weather) return;
    const newBox = new Box(weather);
    const weatherBox = document.getElementById('weather-container');
    weatherBox.appendChild(newBox.element);
}

searchField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searching();
    }
});

searchButton.addEventListener('click', searching);

document.addEventListener("saveBox", (event) => {
    const weather = event.detail;
    localStorage.setItem("savedWeather", JSON.stringify(weather));

    const savedDiv = document.getElementById("saved");
    savedDiv.innerHTML = `
        <p>Stad: ${weather.city}</p>
        <p>Väder: ${weatherCodes[weather.current_weather.weathercode]}</p>
        <p>Temperatur: ${weather.current_weather.temperature} °C</p>
    `;
});

const saved = JSON.parse(localStorage.getItem("savedWeather"));
if (saved) {
    const savedDiv = document.getElementById("saved");
    savedDiv.innerHTML = `
        <p>Stad: ${saved.city}</p>
        <p>Väder: ${weatherCodes[saved.current_weather.weathercode]}</p>
        <p>Temperatur: ${saved.current_weather.temperature} °C</p>
    `;
}
