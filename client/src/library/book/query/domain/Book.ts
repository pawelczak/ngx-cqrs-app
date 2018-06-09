export class Book {

	constructor(
		public id: number,
		public title: string,
		public rating?: number
	) {}


	hasAuthors(): boolean {
		return false;
	}

	hasTitle(): boolean {
		return !!this.title;
	}

	getShortTitle(): string {
		let shortTitle = this.title.slice(0, 15);
		return  this.title.length >= 15 ? shortTitle+ '...' : shortTitle;
	}

	hasRating(): boolean {
		return !!this.rating;
	}
}
