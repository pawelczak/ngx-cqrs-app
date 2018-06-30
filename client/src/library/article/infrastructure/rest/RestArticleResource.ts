import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ArticleResource } from '../../domain/command/ArticleResource';
import { ArticleAggregate } from '../../domain/command/ArticleAggregate';

export class RestArticleResource extends ArticleResource {

	fetchAll(): Observable<Array<ArticleAggregate>> {
		return of([
			new ArticleAggregate('1@1', 'The Mysterious Affair at Styles', 'Content', 1921),
			new ArticleAggregate('1@2', 'The Secret Adversary', '', 1922),
			new ArticleAggregate('1@3', 'The Murder on the Links', '',1923),
			new ArticleAggregate('1@4', 'The Man in the Brown Suit', '', 1924),

			new ArticleAggregate('1@1', 'The Mysterious Affair at Styles', 'Content', 1921),
			new ArticleAggregate('1@2', 'The Secret Adversary', '', 1922),
			new ArticleAggregate('1@3', 'The Murder on the Links', '',1923),
			new ArticleAggregate('1@4', 'The Man in the Brown Suit', '', 1924),

			new ArticleAggregate('1@1', 'The Mysterious Affair at Styles', 'Content', 1921),
			new ArticleAggregate('1@2', 'The Secret Adversary', '', 1922),
			new ArticleAggregate('1@3', 'The Murder on the Links', '',1923),
			new ArticleAggregate('1@4', 'The Man in the Brown Suit', '', 1924),

			new ArticleAggregate('1@1', 'The Mysterious Affair at Styles', 'Content', 1921),
			new ArticleAggregate('1@2', 'The Secret Adversary', '', 1922),
			new ArticleAggregate('1@3', 'The Murder on the Links', '',1923),
			new ArticleAggregate('1@4', 'The Man in the Brown Suit', '', 1924)
		])
			.pipe(
				delay(3000)
			);
	}
}