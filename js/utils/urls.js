export function cityToCordinatesUrl(city) {
     return `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&format=json`

}

export function cordsTemperatureURL(lat, lon){
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
}