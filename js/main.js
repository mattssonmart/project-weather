import { getWeatherCity } from './services/weatherService.js';
// import { createWeatherBox } from './components/weatherBox.js';
// import { MOCK } from '../mock.js';



const searchEnter = document.getElementById('searchEnter');
const searchClick = document.getElementById('searchClick');
const displayText = document.getElementById('displayText');


async function searching() {
      let searchCity = searchEnter.value;
      console.log("söker efter", searchCity);
      searchEnter.value = '';
      const weather = await getWeatherCity(searchCity);
      console.log("hittade", weather);
      displayText.innerHTML = `Just nu i ${weather.city} är ${weather.weather} det  med en temperatur på ${weather.temp} °C`;
};

searchEnter.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searching();
    }
});

searchClick.addEventListener('click', searching);


 



// searchEnter.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//         let searchCity  = searchEnter.value;
//         searchEnter.value = '';
//         displayText.innerHTML = return `Just nu i ${city} är det ${weather.description} med en temperatur på ${weather.tempC} °C`;
//     }
// });

// searchClick.addEventListener('click', (event) => {
//     let searchCity = searchEnter.value;
//     searchEnter.value = '';
//     displayText.innerHTML = returnDisplayText(MOCK[searchCity], searchCity);
// });

// function returnDisplayText(weather, city) {
//     return `Just nu i ${city} är det ${weather.description} med en temperatur på ${weather.tempC} °C`;
// };




// async function init() {
//  try {
//  const data = await getWeatherCity(Stockholm); // Helsingborg
//  const box = createWeatherBox(data);
//  document.body.appendChild(box);
//  } catch (error) {
//  console.error(error);
//  }
// }
// init();