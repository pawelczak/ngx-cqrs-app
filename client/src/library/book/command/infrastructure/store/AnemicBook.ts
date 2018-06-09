import { BookAggregate } from '../../domain/BookAggregate';

export class AnemicBook {

	constructor(public id: number = -1,
				public title: string,
				public rating: number) {}

	static fromAggregate(bookAggregate: BookAggregate): AnemicBook {
		return new AnemicBook(bookAggregate.id, bookAggregate.title, bookAggregate.rating);
	}

	static fromArrayAggregate(bookAggregates: Array<BookAggregate>): Array<AnemicBook> {
		return bookAggregates.map((bookAggregate: BookAggregate) => {
			return new AnemicBook(bookAggregate.id, bookAggregate.title, bookAggregate.rating)
		});
	}

}

