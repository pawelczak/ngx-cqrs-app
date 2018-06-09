import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BookResource } from '../../domain/BookResource';
import { BookAggregate } from '../../domain/BookAggregate';


@Injectable()
export class RestBookResource extends BookResource {

	static counter = 5;

	constructor() {
		super();
	}

	fetchAll(): Observable<Array<BookAggregate>> {
		return of(this.books);
	}

	addBook(title: string): Observable<BookAggregate> {
		return of(new BookAggregate(++RestBookResource.counter, title));
	}

	updateBook(title: string): Observable<void> {
		return of(null);
	}

	deleteBook(id: number): Observable<void> {
		return of(null);
	}

	private books = [
		new BookAggregate(1, 'Gone with the wind'),
		new BookAggregate(2, 'Lord of the Flies'),
		new BookAggregate(3, 'The Hobbit')
	]
}
