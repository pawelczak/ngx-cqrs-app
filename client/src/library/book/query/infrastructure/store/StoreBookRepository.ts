import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BookRepository } from '../../domain/BookRepository';
import { Book } from '../../domain/Book';


@Injectable()
export class StoreBookRepository extends BookRepository {

	constructor(private store: Store<any>) {
		super();
	}

	selectBooks(): Observable<Array<Book>> {

		return combineLatest(
			this.selectBookEntities(),
			this.selectFavouriteBookIds()
		)
			.pipe(
				map((combinedValues) => {

					const entities = combinedValues[0],
						favouriteBookIds = combinedValues[1];

					let newBooks: Array<Book> = [];

					return Object.keys(entities)
								 .map(id => entities[id])
								 .map((book: any) => {
									 const favourite = favouriteBookIds.some((f: number) => f === book.id);
									 return new Book(book.id, book.title, book.rating, favourite);
								 });
				})
			);
	}

	selectBookEntities(): Observable<{ [key: number]: any }> {
		return this.store
				   .select(state => state.library.books)
				   .pipe(
					   filter(state => state.fetched),
					   map(state => state.entities)
				   );
	}

	selectFavouriteBookIds(): Observable<Array<number>> {
		return this.store.select(state => state.library.favourites)
				   .pipe(
					   filter(state => state.fetched),
					   map(state => state.favourites)
				   );
	}

}
