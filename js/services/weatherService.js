import { weatherCodes } from '../utils/weatherCodes.js';

export class getWeather {

    listCity = [];
    listCord = [];

    constructor() {

    }

    async getWeatherCity(city) {

    const urlCity = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&format=json`;

    if (this.listCity[urlCity]) {
        let nowCity = new Date.getTime();
        let deltaCity = nowCity - this.listCity[urlCity];
        if (deltaCity < 1000)
            return null;
    }

    let response = await fetch(urlCity);
    if (!response.ok) throw new Error("kunde inte hämta kordinater");
    const dataCords = await response.json();
    this.listCity[urlCity] = new Date().getTime();
    
    const urlCord = `https://api.open-meteo.com/v1/forecast?latitude=${dataCords.results[0].latitude}&longitude=${dataCords.results[0].longitude}&current_weather=true`;

    if (this.listCord[urlCord]) {
        let nowCord = new Date.getTime();
        let deltaCord = nowCord - this.listCord[urlCord];
        if (deltaCord < 1000)
            return null;

    }

    response = await fetch(urlCord);
    if (!response.ok) throw new Error("Kunde inte hämta väderdata");
    const dataWeather = await response.json();
    this.listCord[urlCord] = new Date().getTime();

    const weatherData = {
        city: city,
        temp: dataWeather.current_weather.temperature,
        weather: weatherCodes[dataWeather.current_weather.weathercode],
        time: dataWeather.current_weather.time,
        timeZone: dataWeather.timezone }

        return weatherData
    }
}