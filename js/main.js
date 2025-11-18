import { getWeather } from './services/weatherService.js';
import { Box } from './components/box.js';
// import { getWeather } from '../test.js';

const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');
const weatherService = new getWeather();

async function searching() {
    let city = searchField.value;
    searchField.value = '';
    const weather = await weatherService.getWeatherCity(city);
    const newBox = new Box(weather);
    document.body.appendChild(newBox.element);
}

searchField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searching();
    }
});

searchButton.addEventListener('click', searching);


    

