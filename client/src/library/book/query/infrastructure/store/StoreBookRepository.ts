import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BookRepository } from '../../domain/BookRepository';
import { STORE_BOOK_NAME } from '../../../command/infrastructure/store/StoreBookNameToken';

@Injectable()
export class StoreBookRepository extends BookRepository {

	constructor(private store: Store<any>,
				@Inject(STORE_BOOK_NAME) private storeName: string) {
		super();
	}

	selectBookEntities(): Observable<{ [key: number]: any }> {
		return this.store
				   .select(state => this.getFeatureState(state).books)
				   .pipe(
					   filter(state => state.fetched),
					   map(state => state.entities)
				   );
	}

	selectFavouriteBookIds(): Observable<Array<number>> {
		return this.store
				   .select(state => this.getFeatureState(state).favourites)
				   .pipe(
					   filter(state => state.fetched),
					   map(state => state.favourites)
				   );
	}

	private getFeatureState(state: any): any {
		return state[this.storeName];
	}

}
