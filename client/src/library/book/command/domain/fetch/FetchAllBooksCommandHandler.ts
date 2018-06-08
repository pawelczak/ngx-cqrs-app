import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
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
					   tap((aggregates: Array<BookAggregate>) => {

						   aggregates.forEach((bookAggregate: BookAggregate) => {
							   bookAggregate.calculateRating();
						   });

						   this.bookDispatcher.dispatch(new FetchAllBooksSuccessCommand(aggregates));
					   }),
					   map(() => null),
					   catchError((error) => {
						   this.bookDispatcher.dispatch(new FetchAllBooksFailureCommand(error));
						   return EMPTY;
					   })
				   );
	}
}
