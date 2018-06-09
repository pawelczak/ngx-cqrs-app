import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnemicBook } from '../../../command/infrastructure/store/AnemicBook';
import { BookRepository } from '../../domain/BookRepository';
import { Book } from '../../domain/Book';


@Injectable()
export class StoreBookRepository extends BookRepository {

	constructor(private store: Store<any>) {
		super();
	}

	selectBooks(): Observable<Array<Book>> {
		return this.store
				   .select(state => state.library.books.books)
				   .pipe(
						// BookAnemia only link between command and query
						// Selectors can probably handle this issue
				   		map((entities: {[key:number]: AnemicBook}) => {
							let newBooks: Array<Book> = [];

							return Object.keys(entities)
										 .map(id => entities[id])
										 .map((book: any) => {
											return new Book(book.id, book.title, book.rating);
										 });
						})
				   );
	}

}
