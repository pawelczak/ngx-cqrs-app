import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BookRepository } from '../../domain/BookRepository';

@Injectable()
export class StoreBookRepository extends BookRepository {

	constructor(private store: Store<any>) {
		super();
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
		return this.store
				   .select(state => state.library.favourites)
				   .pipe(
					   filter(state => state.fetched),
					   map(state => state.favourites)
				   );
	}

}
