import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ActionTypes, AddBookFailureAction, AddBookSuccessAction } from '../BookActions';
import { BookAddCommandHandler } from '../../../domain/add/BookAddCommandHandler';
import { BookAddCommand } from '../../../domain/add/BookAddCommand';

@Injectable()
export class StoreBookAddCommandHandler {

	constructor(private actions$: Actions,
				private bookAddCommandHandler: BookAddCommandHandler) {
	}

	@Effect({ dispatch: false })
	addBook$ = this.actions$
				   .ofType(ActionTypes.ADD_BOOK)
				   .pipe(
					   map((action: any) => action.payload),
					   switchMap((addCommand: BookAddCommand) => {

						   return this.bookAddCommandHandler.execute(addCommand)
									  .pipe(
										  switchMap(() => of(null))
									  );
					   })
				   );

}