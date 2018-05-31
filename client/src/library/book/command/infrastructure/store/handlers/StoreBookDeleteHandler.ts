import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ActionTypes, DeleteBookFailureAction, DeleteBookSuccessAction } from '../BookActions';
import { BookDeleteHandler } from '../../../domain/delete/BookDeleteHandler';
import { BookDeleteCommand } from '../../../domain/delete/BookDeleteCommand';

@Injectable()
export class StoreBookDeleteHandler {

	constructor(private actions$: Actions,
				private bookDeleteHandler: BookDeleteHandler) {
	}

	@Effect()
	deleteBook$ = this.actions$
					  .ofType(ActionTypes.DELETE_BOOK)
					  .pipe(
						  map((action: any) => action.payload),
						  switchMap((bookDeleteCommand: BookDeleteCommand) => {
							  return this.bookDeleteHandler
										 .handleDeleteCommand(bookDeleteCommand)
										 .pipe(
											 map(() => {
												 return new DeleteBookSuccessAction(bookDeleteCommand.title);
											 }),
											 catchError((error: any) => {
												 return of(new DeleteBookFailureAction(error));
											 })
										 );
						  })
					  );
}
