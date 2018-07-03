import { Injectable } from '@angular/core';
import { AuthorAggregate } from '../../domain/AuthorAggregate';
import { ArticleContribution } from '../../domain/ArticleContribution';

@Injectable()
export class RestAuthorConverter {

	convert(rawAuthor: any): AuthorAggregate {

		let aggregate = new AuthorAggregate(
			rawAuthor.id,
			rawAuthor.name,
			this.convertContributions(rawAuthor.contributions)
		);

		return aggregate;
	}

	convertArray(rawAuthors: Array<any>): Array<AuthorAggregate> {
		return rawAuthors.map((rawAuthor) => {
			return this.convert(rawAuthor);
		})
	}

	private convertContributions(rawContribs: Array<any>): Array<ArticleContribution>{
		return rawContribs.map((contrib) => {
			return new ArticleContribution(contrib);
		});
	}
}