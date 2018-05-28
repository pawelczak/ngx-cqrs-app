import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BookQueryResource } from '../../domain/BookQueryResource';
import { BookDTO } from '../../../command/domain/BookDTO';

@Injectable()
export class RestBookQueryResource extends BookQueryResource {

	constructor() {
		super();
	}

	fetchBooks(): Observable<Array<BookDTO>> {
		return of(this.books);
	}

	private books = [
		new BookDTO('Gone with the wind'),
		new BookDTO('Lord of the Flies'),
		new BookDTO('The Hobbit')
	]

}
