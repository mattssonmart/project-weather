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
    const weatherData = await response.json();
    weatherData.city = city;

    return weatherData
    }
}