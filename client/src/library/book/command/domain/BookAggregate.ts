export class BookAggregate {

	constructor(public id: number,
				public title: string,
				public rating?: number) {}

	calculateRating() {
		// DOMAIN LOGIC
		this.rating = Math.floor(this.title.length * 0.312) + this.title.charCodeAt(0) % 8;
	}

}
