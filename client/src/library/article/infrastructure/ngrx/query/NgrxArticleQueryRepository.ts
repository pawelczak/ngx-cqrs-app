import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleQueryRepository } from '../../../domain/query/ArticleQueryRepository';
import { ArticleQuery } from '../../../domain/query/ArticleQuery';
import { ArticleStoreAnemia } from '../ArticleStoreAnemia';

@Injectable()
export class NgrxArticleQueryRepository extends ArticleQueryRepository {

	constructor(private store: Store<any>) {
		super();
	}

	selectAll(): Observable<Array<ArticleQuery>> {
		return this.store.select(state => state.articles.articles.entities)
			.pipe(
				map((entities: { [key: string]: ArticleStoreAnemia }) => {
					return Object.keys(entities)
								 .map(id => entities[id])
								 .map((article: any) => {
									 return new ArticleQuery(article.id, article.title);
								 });
				})
			)
	}

}
