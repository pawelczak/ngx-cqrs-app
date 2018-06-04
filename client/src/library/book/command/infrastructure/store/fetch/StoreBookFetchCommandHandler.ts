import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FetchAllBooksCommandHandler } from '../../../domain/fetch/FetchAllBooksCommandHandler';
import { ActionTypes, FetchAllBookFailureAction, FetchAllBookSuccessAction } from '../BookActions';

@Injectable()
export class StoreBookFetchCommandHandler {

	constructor(private actions$: Actions,
				private bookFetchHandler: FetchAllBooksCommandHandler) {
	}

	@Effect()
	fetchBooks$ = this.actions$
					  .ofType(ActionTypes.FETCH_ALL_BOOK)
					  .pipe(
							switchMap(() => {
								return this.bookFetchHandler
										   .execute()
										   .pipe(
											   map((books: any) => {
												   return new FetchAllBookSuccessAction(books);
											   }),
											   catchError((error: any) => {
												   return of(new FetchAllBookFailureAction(error));
											   })
										   );
							})
					  );

}
