import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { DeleteBookCommand, DeleteBookFailureCommand, DeleteBookSuccessCommand } from './DeleteBookCommands';
import { BookDispatcher } from '../BookDispatcher';

@Injectable()
export class DeleteBookCommandHandler {

	constructor(private bookResource: BookResource,
				private bookDispatcher: BookDispatcher) {
	}

	execute(deleteBookCommand: DeleteBookCommand): Observable<boolean> {

		const bookId = deleteBookCommand.id;

		return this.bookResource
				   .deleteBook(bookId)
				   .pipe(
					   tap(() => {
						   this.bookDispatcher.dispatch(new DeleteBookSuccessCommand(bookId));
					   }),
					   map(() => null),
					   catchError((error) => {
						   this.bookDispatcher.dispatch(new DeleteBookFailureCommand(error));
						   return EMPTY;
					   })
				   );
	}
}
