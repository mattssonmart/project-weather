export function createWeatherBox(weatherData) {
 const div = document.createElement('div');
 div.className = 'weather-box';
 div.innerHTML = `
 <h2>Väder just nu</h2>
 <p>Temperatur: ${weatherData.current_weather.temperature}°C</p>
 <p>Vindhastighet: ${weatherData.current_weather.windspeed} m/s</p>
 `;
 return div;
}