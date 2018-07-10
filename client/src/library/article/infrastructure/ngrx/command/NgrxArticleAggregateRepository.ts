import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleAggregateRepository } from '../../../domain/command/ArticleAggregateRepository';
import { ArticleAggregate } from '../../../domain/command/ArticleAggregate';
import { ArticleStoreAnemia } from '../ArticleStoreAnemia';
import { ARTICLE_STORE_NAME } from '../NgrxArticleStoreName';

@Injectable()
export class NgrxArticleAggregateRepository extends ArticleAggregateRepository {

	constructor(private store: Store<any>,
				@Inject(ARTICLE_STORE_NAME) private storeName: string) {
		super();
	}

	selectAll(): Observable<Array<ArticleAggregate>> {
		return this.store.select(state => state[this.storeName].articles.entities)
				   .pipe(
					   map((entities: { [key: string]: ArticleStoreAnemia }) => {
						   return Object.keys(entities)
										.map((article: any) => {
											return new ArticleAggregate(article.id, article.title, article.content);
										});
					   })
				   )
	}
}
