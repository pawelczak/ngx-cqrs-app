import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthorRepository } from '../domain/AuthorRepository';
import { Author } from '../domain/Author';
import { AuthorState } from '../../command/infrastructure/store/AuthorState';

@Injectable()
export class StoreAuthorRepository extends AuthorRepository {

	constructor(private store: Store<any>) {
		super();
	}

	selectAll(): Observable<Array<Author>> {

		return this.selectState()
				   .pipe(
					   map(state => state.entities),
					   map((entities: { [key: string]: any }) => {
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

	selectState(): Observable<AuthorState> {
		return this.store.select(state => state.library.authors);
	}

}
