import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ActionTypes, AddBookFailureAction, AddBookSuccessAction } from '../BookActions';
import { BookAddHandler } from '../../../domain/add/BookAddHandler';
import { BookAddCommand } from '../../../domain/add/BookAddCommand';

@Injectable()
export class StoreBookAddHandler {

	constructor(private actions$: Actions,
				private bookAddHandler: BookAddHandler) {
	}

	@Effect()
	addBook$ = this.actions$
				   .ofType(ActionTypes.ADD_BOOK)
				   .pipe(
					   map((action: any) => action.payload),
					   switchMap((addCommand: BookAddCommand) => {

						   return this.bookAddHandler
									  .handleAddCommand(addCommand)
									  .pipe(
										  map((books: any) => {
											  return new AddBookSuccessAction(books);
										  }),
										  catchError((error: any) => {
											  return of(new AddBookFailureAction(error));
										  })
									  );
					   })
				   );

}