import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ActionTypes, DeleteBookFailureAction, DeleteBookSuccessAction } from '../BookActions';
import { BookDeleteHandler } from '../../../domain/handlers/BookDeleteHandler';

@Injectable()
export class StoreBookDeleteHandler {

	constructor(private actions$: Actions,
				private bookDeleteHandler: BookDeleteHandler) {
	}

	@Effect()
	deleteBook$ = this.actions$
					  .ofType(ActionTypes.DELETE_BOOK)
					  .pipe(
						  switchMap((action: any) => {
							  let title = action.payload as string;

							  return this.bookDeleteHandler
										 .handleDeleteCommand(title)
										 .pipe(
											 map(() => {
												 return new DeleteBookSuccessAction(title);
											 }),
											 catchError((error: any) => {
												 return of(new DeleteBookFailureAction(error));
											 })
										 );
						  })
					  );
}
