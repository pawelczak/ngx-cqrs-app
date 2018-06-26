import { ArticleContributionQuery } from './ArticleContributionQuery';
import { ArticleQuery } from '../../../article/domain/query/ArticleQuery';

export class AuthorQuery {

	private articleContributions: Array<ArticleContributionQuery> = [];

	constructor(public id: string,
				public name: string,
				public rating: number,
				public contributions: Array<any> = []) {
	}

	getContributions(): Array<ArticleContributionQuery> {
		return this.articleContributions;
	}

	setContributions(articles: Array<ArticleQuery>): void {

		this.articleContributions = [];
		this.contributions.forEach((contrib: ArticleContributionQuery) => {
			const article = articles.find((article) => article.id === contrib.id);

			if (article) {
				this.articleContributions.push(article);
			}
		});
	}

	hasContributions(): boolean {
		return this.articleContributions.length > 0;
	}

}
