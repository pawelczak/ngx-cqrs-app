import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { BookAggregate } from '../BookAggregate';
import { BookDispatcher } from '../BookDispatcher';
import { AddBookCommand, AddBookFailureCommand, AddBookSuccessCommand } from './AddBookCommands';

@Injectable()
export class AddBookCommandHandler {

	constructor(private bookResource: BookResource,
				private bookDispatcher: BookDispatcher) {
	}

	execute(addBookCommand: AddBookCommand): Observable<void> {

		const title = addBookCommand.title;

		return this.bookResource.addBook(title)
				   .pipe(
					   tap((bookAggregate: BookAggregate) => {

						   bookAggregate.calculateRating();

						   this.bookDispatcher.dispatch(new AddBookSuccessCommand(bookAggregate));
					   }),
					   map(() => null),
					   catchError((error) => {
						   this.bookDispatcher.dispatch(new AddBookFailureCommand(error));
						   return EMPTY;
					   })
				   );
	}

}
