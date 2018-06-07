import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { BookAggregate } from '../BookAggregate';
import { FetchAllBooksFailureCommand, FetchAllBooksSuccessCommand } from './FetchBookCommands';
import { BookDispatcher } from '../BookDispatcher';

@Injectable()
export class FetchAllBooksCommandHandler {

	constructor(private bookResource: BookResource,
				private bookDispatcher: BookDispatcher) {
	}

	execute(): Observable<Array<BookAggregate>> {

		return this.bookResource
				   .fetchAll()
				   .pipe(
					   map((books: Array<BookAggregate>) => {

						   books.forEach((bookAggregate: BookAggregate) => {
							   bookAggregate.calculateRating();
						   });

						   return books;
					   }),
					   tap((books: Array<BookAggregate>) => {

						   this.bookDispatcher.dispatch(new FetchAllBooksSuccessCommand(books));
					   }),
					   catchError((error) => {
						   this.bookDispatcher.dispatch(new FetchAllBooksFailureCommand(error));
						   return of(error);
					   })
				   );
	}
}
