import { Observable } from 'rxjs';
import { ArticleAggregate } from './ArticleAggregate';

export abstract class ArticleAggregateRepository {

	abstract selectAll(): Observable<Array<ArticleAggregate>>;
}
