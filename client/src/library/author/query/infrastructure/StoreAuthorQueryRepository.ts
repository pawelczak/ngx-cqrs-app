import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthorQueryRepository } from '../domain/AuthorQueryRepository';
import { AuthorQuery } from '../domain/AuthorQuery';
import { AuthorState } from '../../command/infrastructure/store/AuthorState';
import { ArticleQueryRepository } from '../../../article/domain/query/ArticleQueryRepository';

@Injectable()
export class StoreAuthorQueryRepository extends AuthorQueryRepository {

	constructor(private store: Store<any>,
				articleQueryRepository: ArticleQueryRepository) {
		super(articleQueryRepository);
	}

	selectAuthorsFromState(): Observable<Array<AuthorQuery>> {

		return this.selectState()
				   .pipe(
					   map(state => state.entities),
					   map((entities: { [key: string]: any }) => {
						   return Object.keys(entities)
										.map(id => entities[id])
										.map((author: any) => {
											return new AuthorQuery(
												author.id,
												author.name,
												author.rating,
												author.contributions);
										});
					   })
				   );
	}

	selectOne(): Observable<AuthorQuery> {
		return undefined;
	}

	private selectState(): Observable<AuthorState> {
		return this.store.select(state => state.library.authors);
	}

}
