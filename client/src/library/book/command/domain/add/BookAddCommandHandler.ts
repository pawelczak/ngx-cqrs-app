import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { BookAddCommand } from './BookAddCommand';
import { BookAggregate } from '../BookAggregate';
import { BookDispatcher } from '../BookDispatcher';
import { BookAddSuccessCommand } from './BookAddSuccessCommand';

@Injectable()
export class BookAddCommandHandler {

	constructor(private bookResource: BookResource,
				private bookDispatcher: BookDispatcher) {
	}

	execute(bookAddCommand: BookAddCommand): Observable<void> {

		const title = bookAddCommand.title;

		return this.bookResource.addBook(title)
				   .pipe(
					   map((bookAggregate: BookAggregate) => {

						   bookAggregate.calculateRating();

						   return bookAggregate;
					   }),
					   tap((bookAggregate: BookAggregate) => {
							this.bookDispatcher.dispatch(new BookAddSuccessCommand(bookAggregate));
					   }),
					   catchError((error) => {
						   return of(error);
					   })
				   );
	}

}
