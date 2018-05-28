import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as BookActions from '../infrastructure/store/BookActions';


// abstract class
// implementation move to infrastructure
@Injectable()
export class BookDispatcher {

	constructor(private store: Store<any>) {
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
