import { ArticleContribution } from './ArticleContribution';
import { ArticleAggregate } from '../../../article/domain/command/ArticleAggregate';

export class AuthorAggregate {

	private rating: number;

	constructor(public id: string,
				public name: string,
				public contributions: Array<ArticleContribution>) {}

	setRating(rating: number): void {
		this.rating = rating;
	}

	incRating(): void {
		this.rating++;
	}

	getRating(): number {
		return this.rating;
	}

	setContributions(articles: Array<ArticleAggregate>): void {

		this.contributions.forEach((contrib: ArticleContribution) => {
			const article = articles.find((article: ArticleAggregate) => article.getId() === contrib.id);
			if (article) {
				contrib.setArticle(article);
			}
		});
	}
}
