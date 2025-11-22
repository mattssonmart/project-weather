import { cordsTemperatureURL } from '../utils/urls.js'

export class UpdateWeatherData {

    constructor(filter) {
        this.filter = filter;
    }
    
    async updateCords(lat,lon,city){
    const urlCord = cordsTemperatureURL(lat,lon);
    if (!this.filter.allow(urlCord)) return null;
    const response = await fetch(urlCord);
    if (!response.ok) throw new Error("Kunde inte hämta väderdata");
    const weatherData = await response.json();
    weatherData.city = city;

    return weatherData
    }
}