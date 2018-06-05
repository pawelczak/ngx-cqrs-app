import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookDispatcher } from '../../domain/BookDispatcher';
import { Command } from '../../../../../util/cqrs/Command';
import { AddBookSuccessAction, DeleteBookSuccessAction, FetchAllBooksAction, FetchAllBooksSuccessAction } from './BookActions';
import { AnemicBook } from './AnemicBook';
import { AddBookCommand, AddBookSuccessCommand } from '../../domain/add/AddBookCommands';
import { DeleteBookSuccessCommand } from '../../domain/delete/DeleteBookCommands';
import { FetchAllBooksCommand, FetchAllBooksSuccessCommand } from '../../domain/fetch/FetchBookCommands';


@Injectable()
export class StoreBookDispatcher extends BookDispatcher {

	constructor(private store: Store<any>) {
		super();
	}

	dispatch(command: Command): void {

		if (command instanceof AddBookSuccessCommand) {

			const aggregate = (command as AddBookSuccessCommand).bookAggregate,
				anemicBook = new AnemicBook(aggregate.title, aggregate.rating);

			this.store.dispatch(new AddBookSuccessAction(anemicBook));
		}

		if (command instanceof DeleteBookSuccessCommand) {

			const title = (command as DeleteBookSuccessCommand).title;

			this.store.dispatch(new DeleteBookSuccessAction(title));
		}

		if (command instanceof FetchAllBooksCommand) {

			this.store.dispatch(new FetchAllBooksAction());
		}

		if (command instanceof FetchAllBooksSuccessCommand) {

			const aggregates = (command as FetchAllBooksSuccessCommand).bookAggregates,
				anemicBooks = AnemicBook.fromArrayAggregate(aggregates);

			this.store.dispatch(new FetchAllBooksSuccessAction(anemicBooks));
		}

	}

}
