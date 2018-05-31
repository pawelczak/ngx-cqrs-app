import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookDispatcher } from '../../domain/BookDispatcher';
import * as BookActions from './BookActions';
import { BookAddCommand } from '../../domain/add/BookAddCommand';
import { BookDeleteCommand } from '../../domain/delete/BookDeleteCommand';


@Injectable()
export class StoreBookDispatcher extends BookDispatcher {

	constructor(private store: Store<any>) {
		super();
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
