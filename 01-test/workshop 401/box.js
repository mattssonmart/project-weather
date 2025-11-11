
export class box {

	constructor(_Color, _Goal) {

		this.div = document.createElement("div");
		this.div.style.position = "absolute";
		this.div.style.left = "200px";
		this.div.style.top = "200px";
		this.div.style.width = "100px";
		this.div.style.height = "100px";
		this.div.style.backgroundColor = _Color;
		document.body.appendChild(this.div);

		if (_Goal == true) {
			this.div.style.backgroundColor = "#ff0000";

			this.div.addEventListener("click", () => {
				this.remove();
			});
		}


	}

	move(x, y) {
		this.div.style.left = x.toString() + "px";
		this.div.style.top = y.toString() + "px";
	}

	remove() {
		document.body.removeChild(this.div);
	}

}
