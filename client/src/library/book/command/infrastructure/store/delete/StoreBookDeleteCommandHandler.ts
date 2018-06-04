import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ActionTypes, DeleteBookFailureAction, DeleteBookSuccessAction } from '../BookActions';
import { BookDeleteCommandHandler } from '../../../domain/delete/BookDeleteCommandHandler';
import { BookDeleteCommand } from '../../../domain/delete/BookDeleteCommand';

@Injectable()
export class StoreBookDeleteCommandHandler {

	constructor(private actions$: Actions,
				private bookDeleteCommandHandler: BookDeleteCommandHandler) {
	}

	@Effect()
	deleteBook$ = this.actions$
					  .ofType(ActionTypes.DELETE_BOOK)
					  .pipe(
						  map((action: any) => action.payload),
						  switchMap((bookDeleteCommand: BookDeleteCommand) => {
							  return this.bookDeleteCommandHandler
										 .execute(bookDeleteCommand)
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
