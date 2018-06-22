import { Injectable } from '@angular/core';
import { zip } from 'rxjs';

import { AuthorAggregateRepository } from '../AuthorAggregateRepository';
import { AuthorResource } from '../AuthorResource';
import { AuthorAggregate } from '../AuthorAggregate';
import { LoadAuthorsCommand } from '../AuthorCommands';

import { CommandHandler } from '../../../util/cqrs/domain/command/CommandHandler';
import { CommandDispatcher } from '../../../util/cqrs/domain/command/CommandDispatcher';
import { CommandBus } from '../../../util/cqrs/domain/command/CommandBus';

@Injectable()
export class LoadAuthorCommandHandler extends CommandHandler {

	constructor(private commandBus: CommandBus,
				private commandDispatcher: CommandDispatcher,
				private authorAggregateRepository: AuthorAggregateRepository,
				private authorResource: AuthorResource) {
		super();
	}

	execute(command: LoadAuthorsCommand): void {
		if (command instanceof LoadAuthorsCommand) {


			zip(this.authorResource.fetchAll(),
				this.authorResource.fetchAllRatings())
				.subscribe((responses: Array<any>) => {

					const aggregates: Array<AuthorAggregate> = responses[0],
						ratings: {[key: number]: number} = responses[1];

					aggregates.forEach((aggregate: any) => {

						if (ratings[aggregate.id]) {
							aggregate.setRating(ratings[aggregate.id]);
						}

					});

					this.authorAggregateRepository.save(aggregates);
				});
		}
	}
}
