import { getWeatherCity } from './services/weatherService.js';
import { Box } from './components/Box.js';

const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');

async function searching() {
    let city = searchField.value;
    searchField.value = '';
    const weather = await getWeatherCity(city);
    const newBox = new Box(weather);
    document.body.appendChild(newBox.element);
}

searchField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searching();
    }
});

searchButton.addEventListener('click', searching);


    

