export function createWeatherBox(weather) {
 const div = document.createElement('div');
 div.className = 'weather-box';
 div.innerHTML = `
 <h2>Väder just nu</h2>
 <p>Temperatur: ${weather.temp}°C</p>
 <p>Väder: ${weather.weather}°C</p>
 <p>Stad: ${weather.city}°C</p>
 `;
 return div;
}

//<p>Vindhastighet: ${weatherData.current_weather.windspeed} m/s</p> 