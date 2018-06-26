import { ArticleQuery } from '../../../article/domain/query/ArticleQuery';

export class ArticleContributionQuery {

	constructor(public id: string,
				public article?: ArticleQuery) {}
}
