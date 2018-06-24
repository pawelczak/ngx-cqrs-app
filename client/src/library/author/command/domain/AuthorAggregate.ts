export class AuthorAggregate {

	private rating: number;

	constructor(public id: string,
				public name: string) {}

	setRating(rating: number): void {
		this.rating = rating;
	}

	incRating(): void {
		this.rating++;
	}

	getRating(): number {
		return this.rating;
	}
}
