import { Injectable } from '@angular/core';

import { ArticleStoreAnemia } from './ArticleStoreAnemia';
import { ArticleAggregate } from '../../domain/command/ArticleAggregate';

@Injectable()
export class NgrxArticleConverter {

	convert(article: ArticleAggregate): ArticleStoreAnemia {
		return new ArticleStoreAnemia(article.getId(), article.getTitle(), article.getContent());
	}

	convertArticles(articles: Array<ArticleAggregate>): Array<ArticleStoreAnemia> {
		return articles.map((article: ArticleAggregate) => this.convert(article));
	}

}
