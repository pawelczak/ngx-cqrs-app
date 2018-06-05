import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BookResource } from '../../domain/BookResource';
import { BookAggregate } from '../../domain/BookAggregate';


@Injectable()
export class RestBookResource extends BookResource {

	constructor() {
		super();
	}

	fetchBooks(): Observable<Array<BookAggregate>> {
		return of(this.books);
	}

	addBook(title: string): Observable<BookAggregate> {
		return of(new BookAggregate(title));
	}

	updateBook(title: string): Observable<boolean> {
		return of(true);
	}

	deleteBook(title: string): Observable<boolean> {
		return of(true);
	}

	private books = [
		new BookAggregate('Gone with the wind'),
		new BookAggregate('Lord of the Flies'),
		new BookAggregate('The Hobbit')
	]
}
