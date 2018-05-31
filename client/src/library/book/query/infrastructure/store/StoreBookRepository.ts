import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnemicBook } from '../../../command/domain/AnemicBook';
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
				   		map((books: Array<AnemicBook>) => {
							let newBooks: Array<Book> = [];

							books.forEach((book: AnemicBook) => {
								newBooks.push(new Book(book.title, book.rating));
							});

							return newBooks;
						})
				   );
	}

}
