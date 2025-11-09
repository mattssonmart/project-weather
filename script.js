import { MOCK } from './mock.js';

const searchEnter = document.getElementById('searchEnter');
const searchClick = document.getElementById('searchClick');
const displayText = document.getElementById('displayText');

searchEnter.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let searchCity  = searchEnter.value;
        searchEnter.value = '';
        displayText.innerHTML = returnDisplayText(MOCK[searchCity], searchCity);
        

    }
});

searchClick.addEventListener('click', (event) => {
    let searchCity = searchEnter.value;
    searchEnter.value = '';
    displayText.innerHTML = returnDisplayText(MOCK[searchCity], searchCity);
});

function returnDisplayText(weather, city) {
    return `Just nu i ${city} är det ${weather.description} med en temperatur på ${weather.tempC} °C`;
};

const bgSwitch = document.querySelectorAll('span[data-bg]')

bgSwitch.forEach(span =>  {
    span.addEventListener('click', () => {
        const className = span.dataset.bg;
        document.body.className = className;
        console.log('clicki på', span.dataset.bg);
    });
});