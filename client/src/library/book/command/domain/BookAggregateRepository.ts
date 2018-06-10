import { BookAggregate } from './BookAggregate';

import { AggragateRepository } from '../../../../util/cqrs/command/AggragateRepository';

export abstract class BookAggregateRepository extends AggragateRepository {

	abstract getBookAggregate(bookId: string): BookAggregate;

}
