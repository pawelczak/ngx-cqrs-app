import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleQuery } from './ArticleQuery';

export abstract class ArticleQueryRepository {

	selectAllByIds(ids: Array<string>): Observable<Array<ArticleQuery>> {
		return this.selectAll()
				   .pipe(
					   map((articles: Array<ArticleQuery>) => {
						   return articles.filter((article) => {
							   return ids.some((id: string) => article.id === id);
						   });
					   })
				   );
	}

	abstract selectAll(): Observable<Array<ArticleQuery>>;
}
