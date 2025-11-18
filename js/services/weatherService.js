import { weatherCodes } from '../utils/weatherCodes.js';
import { cityToCoordinatesUrl, cordsTemperatureURL } from '../utils/urls.js'

export class GetWeather {

    constructor(filter) {
        this.filter = filter;
    }

    async getWeatherCity(city) {

    const urlCity = cityToCoordinatesUrl(city);

    if (!this.filter.allow(urlCity)) return null;

    let response = await fetch(urlCity);
    if (!response.ok) throw new Error("kunde inte hämta kordinater");
    const dataCords = await response.json();
    
    const urlCord = cordsTemperatureURL(dataCords.results[0].latitude,dataCords.results[0].longitude)

    if (!this.filter.allow(urlCord)) return null;

    response = await fetch(urlCord);
    if (!response.ok) throw new Error("Kunde inte hämta väderdata");
    const dataWeather = await response.json();

    const weatherData = {
        city: city,
        temp: dataWeather.current_weather.temperature,
        weather: weatherCodes[dataWeather.current_weather.weathercode],
        time: dataWeather.current_weather.time,
        timeZone: dataWeather.timezone }

        return weatherData
    }
}