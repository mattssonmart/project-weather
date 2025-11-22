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
        const code = this.weather.current_weather.weathercode;

        this.element.innerHTML = `
            <p>Stad: ${this.weather.city}</p>
            <p>Väder: ${weatherCodes[code] ? weatherCodes[code].description : 'Okänt'}</p>
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
            console.error("kunde inte uppdatera väder", this.weather.city, err);
        }
    }
}
