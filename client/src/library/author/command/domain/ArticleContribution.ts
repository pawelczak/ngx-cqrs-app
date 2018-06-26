import { ArticleAggregate } from '../../../article/domain/command/ArticleAggregate';

export class ArticleContribution {

	private article: ArticleAggregate;

	constructor(public id: string) {}

	setArticle(article: ArticleAggregate): void {
		this.article = article;
	}
}