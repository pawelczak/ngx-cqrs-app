import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ActionTypes} from '../BookActions';
import { AddCommandHandler } from '../../../domain/add/AddBookCommandHandler';
import { AddBookCommand } from '../../../domain/add/AddBookCommands';
import { FetchAllBooksCommand } from '../../../domain/fetch/FetchBookCommands';

@Injectable()
export class StoreBookAddCommandHandler {

	constructor(private actions$: Actions,
				private bookAddCommandHandler: AddCommandHandler) {
	}

	@Effect({ dispatch: false })
	addBook$ = this.actions$
				   .ofType(AddBookCommand.type)
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
