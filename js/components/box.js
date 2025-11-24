import { weatherCodes } from '../utils/weatherCodes.js';
import { UpdateWeatherData } from '../services/updateweatherdata.js';

export class Box {
    constructor(weather, filter) {
        this.weather = weather;
        this.filter = filter;
        this.updater = new UpdateWeatherData(this.filter);
        this.element = document.createElement('div');
        this.element.className = 'box-style';


        const city = this.weather.city;
        const code = this.weather.current_weather.weathercode;
        const description = weatherCodes[code]?.description || 'okänt';
        const temp = this.weather.current_weather.temperature;
        this.element.setAttribute('role', 'group');
        this.element.tabIndex = 0;
        this.element.setAttribute(
            'aria-label', `I ${city} är det ${temp} grader och ${description.toLowerCase()}`
        );
        this.render();

        this.element.addEventListener("dblclick", () => {
            document.dispatchEvent(new CustomEvent("saveBox", {
                detail: this.weather
            }));
        });

        this.element.addEventListener('keydown', (event) => {
            console.log(event.target);
            if (event.key === 'Enter') {
                event.preventDefault();
                document.dispatchEvent(new CustomEvent("saveBox",{
                    detail: this.weather
                }));
            }           
        });

        this.interval = setInterval(() => {
            this.updateWeather();
        }, 900 * 1000);
    }

    render() {
        const code = this.weather.current_weather.weathercode;

        this.element.innerHTML = `
            <div aria-hidden="true">
                <p>Stad: ${this.weather.city}</p>
                <p>Väder: ${weatherCodes[code] ? weatherCodes[code].description : 'Okänt'}</p>
                <p>Temperatur: ${this.weather.current_weather.temperature} °C</p>
            </div>
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
