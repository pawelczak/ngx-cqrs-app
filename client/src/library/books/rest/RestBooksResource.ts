import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BookAnemia } from '../infrastructure/BookAnemia';
import { BooksResource } from '../infrastructure/BooksResource';

@Injectable()
export class RestBooksResource extends BooksResource {

	constructor() {
		super();
	}

	fetchBooks(): Observable<Array<BookAnemia>> {
		return of(this.books);
	}

	private books = [
		new BookAnemia('Gone with the wind'),
		new BookAnemia('Lord of the Flies'),
		new BookAnemia('The Hobbit')
	]
}