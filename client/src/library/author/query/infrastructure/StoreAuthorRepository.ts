import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';

import { AuthorRepository } from '../domain/AuthorRepository';
import { Author } from '../domain/Author';

@Injectable()
export class StoreAuthorRepository extends AuthorRepository {

	constructor(private store: Store<any>) {
		super();
	}

	selectAll(): Observable<Array<Author>> {

		return this.selectEntities()
				   .pipe(

					   map((entities: any) => {

						   return Object.keys(entities)
										.map(id => entities[id])
										.map((author: any) => {
											return new Author(author.name);
										});
					   })
				   );
	}

	selectOne(): Observable<Author> {
		return undefined;
	}

	selectEntities(): Observable<{ [key: string]: Author }> {
		return this.store.select(state => state.library.authors.entities);
	}

}
