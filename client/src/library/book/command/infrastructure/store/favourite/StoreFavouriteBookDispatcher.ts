import { Command } from '../../../../../../util/cqrs/command/domain/Command';
import { AddBookSuccessCommand } from '../../../domain/add/AddBookCommands';
import { Action, Store } from '@ngrx/store';
import { BookCommandDispatcher } from '../../../domain/BookCommandDispatcher';
import { Injectable } from '@angular/core';
import { AnemicBook } from '../AnemicBook';
import { ReadFavouriteBookIdsSuccessCommand } from '../../../domain/favourite/FavouriteCommands';

@Injectable()
export class StoreFavouriteBookDispatcher extends BookCommandDispatcher {

	constructor(private store: Store<any>) {
		super();
	}

	dispatch(command: Command): void {

		if (command instanceof ReadFavouriteBookIdsSuccessCommand) {

			const ids = (command as ReadFavouriteBookIdsSuccessCommand).payload;

			const action = {
				type: command.constructor.name,
				payload: command
			} as Action;

			this.store.dispatch(action);
		}
	}
}
