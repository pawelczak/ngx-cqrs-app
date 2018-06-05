import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FetchAllBooksCommandHandler } from '../../../domain/fetch/FetchAllBooksCommandHandler';
import { ActionTypes } from '../BookActions';
import { FetchAllBooksCommand } from '../../../domain/fetch/FetchBookCommands';

@Injectable()
export class StoreBookFetchCommandHandler {

	constructor(private actions$: Actions,
				private fetchAllBooksCommandHandler: FetchAllBooksCommandHandler) {
	}

	@Effect({ dispatch: false })
	fetchAllBooks$ = this.actions$
				   .ofType(ActionTypes.FETCH_ALL_BOOKS)
				   .pipe(
					   map((action: any) => action.payload),
					   switchMap((fetchAllBooksCommand: FetchAllBooksCommand) => {

						   return this.fetchAllBooksCommandHandler
									  .execute()
									  .pipe(
										  switchMap(() => of(null))
									  );
					   })
				   );

}
