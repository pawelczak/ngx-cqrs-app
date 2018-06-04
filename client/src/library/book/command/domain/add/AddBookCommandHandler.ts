import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { BookAggregate } from '../BookAggregate';
import { BookDispatcher } from '../BookDispatcher';
import { AddBookCommand, AddBookSuccessCommand } from './AddBookCommands';

@Injectable()
export class AddCommandHandler {

	constructor(private bookResource: BookResource,
				private bookDispatcher: BookDispatcher) {
	}

	execute(addBookCommand: AddBookCommand): Observable<void> {

		const title = addBookCommand.title;

		return this.bookResource.addBook(title)
				   .pipe(
					   map((bookAggregate: BookAggregate) => {

						   bookAggregate.calculateRating();

						   return bookAggregate;
					   }),
					   tap((bookAggregate: BookAggregate) => {
							this.bookDispatcher.dispatch(new AddBookSuccessCommand(bookAggregate));
					   }),
					   catchError((error) => {
						   return of(error);
					   })
				   );
	}

}
