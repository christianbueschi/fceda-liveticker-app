
/*
* REST API Model Liveticker
* see: 
*/
export class Liveticker {

	private text: string;
	private minute: Number;
	private image: string;
	private isTitle: Boolean;

	constructor(text: string, minute: Number, image: string, isTitle: Boolean) {
		this.text = text;
		this.minute = minute;
		this.image = image;
		this.isTitle = isTitle;
	}

}
