import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { DeleteBookCommand, DeleteBookSuccessCommand } from './DeleteBookCommands';
import { BookDispatcher } from '../BookDispatcher';

@Injectable()
export class DeleteBookCommandHandler {

	constructor(private bookResource: BookResource,
				private bookDispatcher: BookDispatcher) {
	}

	execute(deleteBookCommand: DeleteBookCommand): Observable<boolean> {

		const title = deleteBookCommand.title;

		return this.bookResource
				   .deleteBook(title)
				   .pipe(
					   tap(() => {
						   this.bookDispatcher.dispatch(new DeleteBookSuccessCommand(title));
					   }),
					   catchError((error) => {
						   return of(error);
					   })
				   );
	}
}
