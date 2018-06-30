import { ArticleContributionQuery } from './ArticleContributionQuery';
import { ArticleQuery } from '../../../article/domain/query/ArticleQuery';

export class AuthorQuery {

	public desc: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

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
