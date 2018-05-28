import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BookResource } from '../../domain/BookResource';
import { BookDTO } from '../../domain/BookDTO';


@Injectable()
export class RestBookResource extends BookResource {

	constructor() {
		super();
	}

	addBook(title: string): Observable<BookDTO> {
		return of(new BookDTO(title));
	}

	deleteBook(title: string): Observable<boolean> {
		return of(true);
	}

}
