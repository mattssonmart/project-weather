export class Box {
    constructor(weather) {
        this.weather =weather;
        this.element = document.createElement('div');
        this.element.className = 'box-style';
        this.element.innerHTML = `
        <h2>Väder just nu</h2>
        <p>Temperatur: ${weather.temp} °C</p>
        <p>Väder: ${weather.weather} </p>
        <p>Stad: ${weather.city} </p>
        `;
    }
}