import { Injectable } from '@angular/core';

import { ArticleAggregate } from '../../domain/command/ArticleAggregate';

@Injectable()
export class RestArticleConverter {

	convert(rawArticle: any): ArticleAggregate {
		return new ArticleAggregate(
			rawArticle.id,
			rawArticle.title,
			rawArticle.content,
			rawArticle.pubDate
		);
	}

	convertArray(rawArticles: Array<any>): Array<ArticleAggregate> {
		return rawArticles.map((rawArticle: any) => {
			return this.convert(rawArticle);
		});
	}

}
