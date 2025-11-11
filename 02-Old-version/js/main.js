import { getWeatherCity } from './services/weatherService.js';
// import { createWeatherBox } from './components/weatherBox.js';
import { Box } from './components/Box.js';
// import { MOCK } from '../mock.js';



const searchEnter = document.getElementById('searchEnter');  // trycker enter i input i html
const searchClick = document.getElementById('searchClick'); // klickar sökknappen i html
const displayText = document.getElementById('displayText'); // text som visar i html med väderdata


async function searching() {
      let searchCity = searchEnter.value; // från input fönster i html
      console.log("söker efter", searchCity);  
      searchEnter.value = '';
      const weather = await getWeatherCity(searchCity);
      console.log("hittade", weather);
    //   const box = createWeatherBox(weather)
    //   document.body.appendChild(box);
      const newBox = new Box(weather);
      document.body..appendChild(newBox.element);

      displayText.innerHTML = `Just nu i ${weather.city} är ${weather.weather} det  med en temperatur på ${weather.temp} °C`;
};

searchEnter.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searching();
    }
});

searchClick.addEventListener('click', searching);

// just or learning
 
const bgSwitch = document.querySelectorAll('span[data-bg]')

bgSwitch.forEach(span =>  {
    span.addEventListener('click', () => {
        const className = span.dataset.bg;
        document.body.className = className;
        console.log('clicki på', span.dataset.bg);
    });
});






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