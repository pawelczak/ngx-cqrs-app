import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookDispatcher } from '../../domain/BookDispatcher';
import * as BookActions from './BookActions';
import { BookAddCommand } from '../../domain/add/BookAddCommand';
import { BookDeleteCommand } from '../../domain/delete/BookDeleteCommand';
import { Command } from '../../../../../util/cqrs/Command';
import { BookAddSuccessCommand } from '../../domain/add/BookAddSuccessCommand';
import { AddBookSuccessAction } from './BookActions';


@Injectable()
export class StoreBookDispatcher extends BookDispatcher {

	constructor(private store: Store<any>) {
		super();
	}

	dispatch(command: Command): void {

		if (command instanceof BookAddSuccessCommand) {
			this.store.dispatch(new AddBookSuccessAction((command as BookAddSuccessCommand).anemicBook));
		}
	}

	fetchBooks(): void {
		this.store.dispatch(new BookActions.FetchAllBookAction());
	}

	addBook(bookAddCommand: BookAddCommand): void {
		this.store.dispatch(new BookActions.AddBookAction(bookAddCommand));
	}

	deleteBook(bookDeleteCommand: BookDeleteCommand): void {
		this.store.dispatch(new BookActions.DeleteBookAction(bookDeleteCommand));
	}

}
