import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AddBookCommandHandler } from '../../../domain/add/AddBookCommandHandler';
import { AddBookCommand } from '../../../domain/add/AddBookCommands';

@Injectable()
export class StoreBookAddCommandHandler {

	constructor(private actions$: Actions,
				private bookAddCommandHandler: AddBookCommandHandler) {
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
