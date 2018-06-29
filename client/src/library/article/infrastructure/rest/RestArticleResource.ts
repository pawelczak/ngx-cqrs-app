import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ArticleResource } from '../../domain/command/ArticleResource';
import { ArticleAggregate } from '../../domain/command/ArticleAggregate';

export class RestArticleResource extends ArticleResource {

	fetchAll(): Observable<Array<ArticleAggregate>> {
		return of([
			new ArticleAggregate('a@1', 'Awesome Title', 'Content')
		])
			.pipe(
				delay(3000)
			);
	}
}