export class Book {

	constructor(
		public title: string
	) {}


	hasAuthors(): boolean {
		return false;
	}

	hasTitle(): boolean {
		return false;
	}

	getShortTitle(): string {
		return this.title.slice(0, 10) + '...';
	}
}
