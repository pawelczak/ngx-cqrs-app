import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import { ActionTypes, DeleteBookSuccessAction } from '../infrastructure/store/BookActions';
import { BookResource } from './BookCommandResource';

@Injectable()
export class BookDeleteHandler {

	constructor(private actions$: Actions,
				private bookResource: BookResource) {
	}

	@Effect()
	deleteBook$ = this.actions$
					  .ofType(ActionTypes.DELETE_BOOK)
					  .pipe(
						  switchMap((action: any) => {
							  let title = action.payload as string;

							  return this.bookResource
										 .deleteBook(title)
										 .pipe(
											 map(() => {
												 return new DeleteBookSuccessAction(title);
											 })
										 );
						  })
					  );
}
