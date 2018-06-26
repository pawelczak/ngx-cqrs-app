import { combineLatest, Observable } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';

import { AuthorQuery } from './AuthorQuery';

import { ArticleQuery } from '../../../article/domain/query/ArticleQuery';
import { ArticleQueryRepository } from '../../../article/domain/query/ArticleQueryRepository';

export abstract class AuthorQueryRepository {

	constructor(protected articleQueryRepository: ArticleQueryRepository) {
	}

	selectAll(): Observable<Array<AuthorQuery>> {

		const articles$ = this.articleQueryRepository.selectAll(),
			authors$ = this.selectAuthorsFromState();

		return combineLatest(authors$, articles$)
			.pipe(
				map((responses) => {
					const authors: Array<AuthorQuery> = responses[0],
						articles: Array<ArticleQuery> = responses[1];

					authors.forEach((author) => {
						author.setContributions(articles);
					});

					return authors;
				})
			);
	}

	abstract selectOne(): Observable<AuthorQuery>;

	abstract selectAuthorsFromState(): Observable<Array<AuthorQuery>>;
}
