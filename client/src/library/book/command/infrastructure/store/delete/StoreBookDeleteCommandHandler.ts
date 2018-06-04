import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ActionTypes, DeleteBookFailureAction, DeleteBookSuccessAction } from '../BookActions';
import { DeleteBookCommandHandler } from '../../../domain/delete/DeleteBookCommandHandler';
import { DeleteBookCommand } from '../../../domain/delete/DeleteBookCommands';

@Injectable()
export class StoreBookDeleteCommandHandler {

	constructor(private actions$: Actions,
				private bookDeleteCommandHandler: DeleteBookCommandHandler) {
	}

	@Effect()
	deleteBook$ = this.actions$
					  .ofType(ActionTypes.DELETE_BOOK)
					  .pipe(
						  map((action: any) => action.payload),
						  switchMap((bookDeleteCommand: DeleteBookCommand) => {
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
