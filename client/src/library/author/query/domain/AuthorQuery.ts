import { ArticleContributionQuery } from './ArticleContributionQuery';

export class AuthorQuery {

	private articleContributions: Array<ArticleContributionQuery>;

	constructor(public id: string,
				public name: string,
				public rating: number,
				public contribiutions: Array<any> = []) {
		this.articleContributions = contribiutions;
	}
}
