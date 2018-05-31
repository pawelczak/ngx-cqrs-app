import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookDispatcher } from '../../domain/BookDispatcher';
import * as BookActions from './BookActions';


@Injectable()
export class StoreBookDispatcher extends BookDispatcher {

	constructor(private store: Store<any>) {
		super();
	}

	fetchBooks(): void {
		this.store.dispatch(new BookActions.FetchAllBookAction());
	}

	addBook(title: string): void {
		this.store.dispatch(new BookActions.AddBookAction(title));
	}

	deleteBook(title: string): void {
		this.store.dispatch(new BookActions.DeleteBookAction(title));
	}

}
