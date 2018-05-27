import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BooksModule } from '../../app/BooksModule';
import { Book } from '../../ui/Book';


@Injectable({
	providedIn: BooksModule
})
export class BooksRepository {

	constructor(private store: Store<any>) {}

	selectBooks(): Observable<Array<Book>> {
		return this.store.select(state => state.library.books);
	}

}
