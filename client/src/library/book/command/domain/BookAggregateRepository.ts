import { BookAggregate } from './BookAggregate';

export abstract class BookAggregateRepository {

	abstract getBookAggregate(bookId: string): BookAggregate;

}
