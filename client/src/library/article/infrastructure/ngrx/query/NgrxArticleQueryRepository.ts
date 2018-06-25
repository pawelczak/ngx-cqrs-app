import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleQueryRepository } from '../../../domain/query/ArticleQueryRepository';
import { ArticleQuery } from '../../../domain/query/ArticleQuery';

@Injectable()
export class NgrxArticleQueryRepository extends ArticleQueryRepository {

	constructor(private store: Store<any>) {
		super();
	}

	selectAll(): Observable<Array<ArticleQuery>> {
		return this.store.select(state => state.articles.articles.entities)
			.pipe(
				map((entities: { [key: string]: any }) => {
					return Object.keys(entities)
								 .map((article: any) => {
									 return new ArticleQuery(article.id, article.name);
								 });
				})
			)
	}

}
