import { Observable } from 'rxjs';

import { ArticleAggregate } from './ArticleAggregate';

export abstract class ArticleAggregateRepository {

	abstract selectAll(): Observable<Array<ArticleAggregate>>;

	abstract save(article: ArticleAggregate): void;
	abstract save(articles: Array<ArticleAggregate>): void;
}
