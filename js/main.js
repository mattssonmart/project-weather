import { GetWeather } from './services/weatherService.js';
import { Box } from './components/box.js';
import { Filter } from './utils/filter.js';

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
    document.body.appendChild(newBox.element);
}

searchField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searching();
    }
});

searchButton.addEventListener('click', searching);


    

