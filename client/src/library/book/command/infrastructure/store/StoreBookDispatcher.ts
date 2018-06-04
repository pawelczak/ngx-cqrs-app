import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookDispatcher } from '../../domain/BookDispatcher';
import * as BookActions from './BookActions';
import { DeleteBookCommand } from '../../domain/delete/DeleteBookCommands';
import { Command } from '../../../../../util/cqrs/Command';
import { AddBookSuccessAction } from './BookActions';
import { AnemicBook } from './AnemicBook';
import { AddBookCommand, AddBookSuccessCommand } from '../../domain/add/AddBookCommands';


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
	}

	fetchBooks(): void {
		this.store.dispatch(new BookActions.FetchAllBookAction());
	}

	addBook(bookAddCommand: AddBookCommand): void {
		this.store.dispatch(new BookActions.AddBookAction(bookAddCommand));
	}

	deleteBook(bookDeleteCommand: DeleteBookCommand): void {
		this.store.dispatch(new BookActions.DeleteBookAction(bookDeleteCommand));
	}

}
