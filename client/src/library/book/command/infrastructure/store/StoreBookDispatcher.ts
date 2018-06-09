import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { BookDispatcher } from '../../domain/BookDispatcher';
import { Command } from '../../../../../util/cqrs/Command';
import { AnemicBook } from './AnemicBook';
import { DeleteBookSuccessCommand } from '../../domain/delete/DeleteBookCommands';
import { AddBookSuccessCommand } from '../../domain/add/AddBookCommands';
import { FetchAllBooksSuccessCommand } from '../../domain/fetch/FetchBookCommands';


@Injectable()
export class StoreBookDispatcher extends BookDispatcher {

	constructor(private store: Store<any>) {
		super();
	}

	dispatch(command: Command): void {

		if (command instanceof AddBookSuccessCommand) {

			const aggregate = (command as AddBookSuccessCommand).bookAggregate,
				anemicBook = new AnemicBook(aggregate.id, aggregate.title, aggregate.rating);

			const addAction = {
				type: command.constructor.name,
				payload: anemicBook
			} as Action;

			this.store.dispatch(addAction);

			return;
		}

		if (command instanceof DeleteBookSuccessCommand) {

			this.store.dispatch({
				type: command.constructor.name,
				payload: (command as DeleteBookSuccessCommand).id
			});

			return;
		}

		if (command instanceof FetchAllBooksSuccessCommand) {
			this.dispatchFetchSuccess(command);

			return;
		}

		const action = {
			type: command.constructor.name,
			payload: command
		} as Action;

		this.store.dispatch(action);
	}

	private dispatchFetchSuccess(command: Command): void {

		const aggregates = (command as FetchAllBooksSuccessCommand).bookAggregates,
			anemicBooks = AnemicBook.fromArrayAggregate(aggregates);

		this.store.dispatch({ type: FetchAllBooksSuccessCommand.name, payload: anemicBooks });
	}
}
