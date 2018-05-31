import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BookResource } from '../../domain/BookResource';
import { BookDTO } from '../../domain/BookDTO';


@Injectable()
export class RestBookCommandResource extends BookResource {

	constructor() {
		super();
	}

	fetchBooks(): Observable<Array<BookDTO>> {
		return of(this.books);
	}

	addBook(title: string): Observable<BookDTO> {
		return of(new BookDTO(title));
	}

	updateBook(title: string): Observable<boolean> {
		return of(true);
	}

	deleteBook(title: string): Observable<boolean> {
		return of(true);
	}

	private books = [
		new BookDTO('Gone with the wind'),
		new BookDTO('Lord of the Flies'),
		new BookDTO('The Hobbit')
	]
}
