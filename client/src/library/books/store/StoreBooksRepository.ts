import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BooksRepository } from '../infrastructure/BooksRepository';
import { Book } from '../ui/Book';


@Injectable()
export class StoreBooksRepository extends BooksRepository {

	constructor(private store: Store<any>) {
		super();
	}

	selectBooks(): Observable<Array<Book>> {
		return this.store.select(state => state.library.books);
	}

}
