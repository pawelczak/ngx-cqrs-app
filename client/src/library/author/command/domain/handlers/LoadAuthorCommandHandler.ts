import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AuthorAggregateRepository } from '../AuthorAggregateRepository';
import { AuthorResource } from '../AuthorResource';
import { AuthorAggregate } from '../AuthorAggregate';
import { LoadAuthorsCommand } from '../AuthorCommands';

import { CommandHandler } from '../../../util/cqrs/domain/command/CommandHandler';
import { CommandDispatcher } from '../../../util/cqrs/domain/command/CommandDispatcher';
import { CommandBus } from '../../../util/cqrs/domain/command/CommandBus';
import { ArticleAggregateRepository } from '../../../../article/domain/command/ArticleAggregateRepository';
import { ArticleAggregate } from '../../../../article/domain/command/ArticleAggregate';

@Injectable()
export class LoadAuthorCommandHandler extends CommandHandler {

	constructor(private commandBus: CommandBus,
				private commandDispatcher: CommandDispatcher,
				private authorAggregateRepository: AuthorAggregateRepository,
				private authorResource: AuthorResource,
				private articleAggregateRepository: ArticleAggregateRepository) {
		super(LoadAuthorsCommand.type);
	}

	execute(command: LoadAuthorsCommand): void {
		zip(this.authorResource.fetchAll(),
			this.authorResource.fetchAllRatings())
			.pipe(
				switchMap((responses: Array<any>) => {

					const aggregates: Array<AuthorAggregate> = responses[0],
						ratings: { [key: number]: number } = responses[1];

					aggregates.forEach((aggregate: any) => {

						if (ratings[aggregate.id]) {
							aggregate.setRating(ratings[aggregate.id]);
						}

					});

					return this.articleAggregateRepository
							   .selectAll()
							   .pipe(
								   map((articleAggregates: Array<ArticleAggregate>) => {

									   aggregates.forEach((aggregate) => {
										   aggregate.setContributions(articleAggregates);
									   });

									   this.authorAggregateRepository.save(aggregates);
								   })
							   );
				})
			)
			.subscribe(() => {});
	}
}
