import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BookAnemia } from './BookAnemia';
import { BooksModule } from '../app/BooksModule';

@Injectable({
	providedIn: BooksModule
})
export class BooksResource {

	constructor() {}

	fetchBooks(): Observable<Array<BookAnemia>> {
		return of(this.books);
	}

	private books = [
		new BookAnemia('Gone with the wind'),
		new BookAnemia('Lord of the Flies'),
		new BookAnemia('The Hobbit')
	]
}