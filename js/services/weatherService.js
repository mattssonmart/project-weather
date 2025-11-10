import { weatherCodes } from '../utils/weatherCodes.js';

// export async function getWeatherCity(city) {
//     const urlCity = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&format=json`
//     const response01 = await fetch(urlCity);
//     if (!response01.ok) throw new Error("kunde inte hämta kordinater");
//     const data = await response01.json();

//     const response02 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true`);
//     if (!response02.ok) throw new Error("Kunde inte hämta väderdata");
//     const data2 = await response02.json();
//     }

export async function getWeatherCity(city) {
    const urlCity = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&format=json`
    let response = await fetch(urlCity);
    if (!response.ok) throw new Error("kunde inte hämta kordinater");
    const dataCords = await response.json();

    response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${dataCords.results[0].latitude}&longitude=${dataCords.results[0].longitude}&current_weather=true`);
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