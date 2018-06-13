import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { BookCommandDispatcher } from '../../../domain/BookCommandDispatcher';
import { ReadFavouriteBookIdsSuccessCommand } from '../../../domain/favourite/FavouriteCommands';

import { Command } from '../../../../../../util/cqrs/command/domain/Command';

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

			return;
		}

		const action = {
			type: command.constructor.name,
			payload: command
		} as Action;

		this.store.dispatch(action);
	}
}
