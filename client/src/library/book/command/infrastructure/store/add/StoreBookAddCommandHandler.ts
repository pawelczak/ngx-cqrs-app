import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ActionTypes} from '../BookActions';
import { AddCommandHandler } from '../../../domain/add/AddBookCommandHandler';
import { AddBookCommand } from '../../../domain/add/AddBookCommands';

@Injectable()
export class StoreBookAddCommandHandler {

	constructor(private actions$: Actions,
				private bookAddCommandHandler: AddCommandHandler) {
	}

	@Effect({ dispatch: false })
	addBook$ = this.actions$
				   .ofType(ActionTypes.ADD_BOOK)
				   .pipe(
					   map((action: any) => action.payload),
					   switchMap((addCommand: AddBookCommand) => {

						   return this.bookAddCommandHandler.execute(addCommand)
									  .pipe(
										  switchMap(() => of(null))
									  );
					   })
				   );

}