import { Injectable } from '@angular/core';

import { FetchArticlesCommand } from './FetchArticlesCommand';
import { ArticleResource } from '../ArticleResource';
import { ArticleAggregateRepository } from '../ArticleAggregateRepository';
import { ArticleAggregate } from '../ArticleAggregate';

import { CommandHandler } from '../../../../author/util/cqrs/domain/command/CommandHandler';

@Injectable()
export class FetchArticlesCommandHandler extends CommandHandler {

	constructor(private articleResource: ArticleResource,
				private articleAggregateRepository: ArticleAggregateRepository) {
		super(FetchArticlesCommand.type);
	}

	execute(command: FetchArticlesCommand): void {

		this.articleResource
			.fetchAll()
			.subscribe((articles: Array<ArticleAggregate>) => {
				this.articleAggregateRepository.save(articles);
			});
	}
}