import { Observable } from 'rxjs';

import { ArticleAggregate } from './ArticleAggregate';

export abstract class ArticleResource {

	abstract fetchAll(): Observable<Array<ArticleAggregate>>;

}
