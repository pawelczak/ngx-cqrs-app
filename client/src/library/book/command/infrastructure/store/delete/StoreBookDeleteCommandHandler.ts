import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DeleteBookCommandHandler } from '../../../domain/delete/DeleteBookCommandHandler';
import { DeleteBookCommand } from '../../../domain/delete/DeleteBookCommands';


@Injectable()
export class StoreBookDeleteCommandHandler {

	constructor(private actions$: Actions,
				private deleteBookCommandHandler: DeleteBookCommandHandler) {
	}

	@Effect({ dispatch: false })
	deleteBook$ = this.actions$
					  .ofType(DeleteBookCommand.type)
					  .pipe(
						  map((action: any) => action.payload),
						  switchMap((deleteBookCommand: DeleteBookCommand) => {

							  return this.deleteBookCommandHandler
										 .execute(deleteBookCommand)
										 .pipe(
											 switchMap(() => of(null))
										 );
						  })
					  );
}
