import { box } from "./box.js";

function randomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function initialize() {

	let boxar = [];

	for (let i = 0; i < 10; i++) {
		let nyBox = new box("#00ff00", i == 0 ? true : false);
		nyBox.move(randomBetween(0, 600), randomBetween(0, 600));

		boxar.push(nyBox);
	}


	setInterval(() => {
		for (let i = 0; i < 10; i++) {
			boxar[i].move(randomBetween(0, 600), randomBetween(0, 600));

		}
	}, 1000);

}


window.addEventListener("load", initialize);
