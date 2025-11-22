import { weatherCodes } from '../utils/weatherCodes.js';
import { UpdateWeatherData } from '../services/updateWeatherData.js';

export class Box {
    constructor(weather, filter) {
        this.weather = weather;
        this.filter = filter;
        this.updater = new UpdateWeatherData(this.filter);

        this.element = document.createElement('div');
        this.element.className = 'box-style';
        this.render();

        this.element.addEventListener("dblclick", () => {
            document.dispatchEvent(new CustomEvent("saveBox", {
                detail: this.weather
            }));
        });

        this.interval = setInterval(() => {
            this.updateWeather();
        }, 900 * 1000);
    }

    render() {
        const background =this.weather.current_weather.weathercode;
        this.element.style.backgroundImage =  `url("${weatherCodes[code].image}")`;
        this.element.innerHTML = `
            <p>Stad: ${this.weather.city}</p>
            <p>Väder: ${weatherCodes[this.weather.current_weather.weathercode]}</p>
            <p>Temperatur: ${this.weather.current_weather.temperature} °C</p>
        `;
    }

    async updateWeather() {
        if (!this.weather.latitude || !this.weather.longitude) return;

        try {
            const newWeather = await this.updater.updateCords(
                this.weather.latitude,
                this.weather.longitude,
                this.weather.city
            );

            if (newWeather && newWeather.current_weather) {
                this.weather.current_weather = newWeather.current_weather;
                this.render();
            }
        } catch (err) {
            console.error("Failed to update weather for", this.weather.city, err);
        }
    }
}
