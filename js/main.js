import { GetWeather } from './services/weatherService.js';
import { Box } from './components/box.js';
import { Filter } from './utils/filter.js';
import { weatherCodes } from './utils/weatherCodes.js';

const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');
const filter = new Filter();
const weatherService = new GetWeather(filter);
const cities = new Set();


async function searching() {
    let city = searchField.value.trim();
    searchField.value = '';

    if (cities.has(city)) {
        alert(`${city} finns redan`)
        return;
    }

    try {
        const weather = await weatherService.getWeatherCity(city);
        if (!weather) return;
        const newBox = new Box(weather, filter);
        const weatherBox = document.getElementById('weather-container');
        weatherBox.appendChild(newBox.element);
        cities.add(city);
    }
    catch (err) {
        alert(`Kunde inte hitta staden`);
    }
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
    const weatherBox = document.getElementById("weather-container");
    const savedBox = new Box(saved, filter);
    weatherBox.appendChild(savedBox.element);
    cities.add(saved.city);
}
