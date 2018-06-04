import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BookFetchCommandHandler } from '../../../domain/fetch/BookFetchCommandHandler';
import { ActionTypes, FetchAllBookFailureAction, FetchAllBookSuccessAction } from '../BookActions';

@Injectable()
export class StoreBookFetchCommandHandler {

	constructor(private actions$: Actions,
				private bookFetchHandler: BookFetchCommandHandler) {
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
