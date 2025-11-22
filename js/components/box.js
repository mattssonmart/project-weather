import { weatherCodes } from '../utils/weatherCodes.js';

export class Box {
    constructor(weather) {
        this.weather = weather;
        this.element = document.createElement('div');
        this.element.className = 'box-style';
        this.element.innerHTML = `
        <p>Stad: ${weather.city}</p>
        <p>Väder: ${weatherCodes[weather.current_weather.weathercode]}</p>
        <p>Temperatur: ${weather.current_weather.temperature} °C</p>
        `;
        this.element.addEventListener("dblclick", ()=> {
            document.dispatchEvent(new CustomEvent("saveBox", {
                detail: this.weather
            }));
        }) 
    }
}

