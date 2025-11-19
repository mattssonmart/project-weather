export class Box {
    constructor(weather) {
        this.weather =weather;
        this.element = document.createElement('div');
        this.element.className = 'box-style';
        this.element.innerHTML = `
        <p>Stad: ${weather.city} </p>
        <p>Väder: ${weather.weather} </p>
        <p>Temperatur: ${weather.temp} °C</p>
        `;
        this.element.addEventListener("dblclick", ()=> {
            document.dispatchEvent(new CustomEvent("saveBox", {
                detail: this.weather
            }));
        }) 
    }
}