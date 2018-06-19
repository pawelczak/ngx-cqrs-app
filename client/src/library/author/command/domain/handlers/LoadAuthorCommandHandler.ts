import { Injectable } from '@angular/core';

import { AuthorAggregateRepository } from '../AuthorAggregateRepository';
import { AuthorResource } from '../AuthorResource';
import { AuthorAggregate } from '../AuthorAggregate';
import { LoadAuthorsCommand } from '../AuthorCommands';

import { CommandHandler } from '../../../util/cqrs/domain/CommandHandler';
import { CommandDispatcher } from '../../../util/cqrs/domain/CommandDispatcher';
import { CommandBus } from '../../../util/cqrs/domain/CommandBus';

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
			this.authorResource
				.fetchAll()
				.subscribe((aggregates: Array<AuthorAggregate>) => {
					this.authorAggregateRepository.save(aggregates);
				});
		}
	}
}
