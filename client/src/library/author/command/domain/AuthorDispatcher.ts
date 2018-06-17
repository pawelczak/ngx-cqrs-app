import { Injectable } from '@angular/core';

import { LoadAuthorsCommand } from './load/LoadAuthorsCommand';
import { AuthorAggregateRepository } from './AuthorAggregateRepository';
import { AuthorResource } from './AuthorResource';
import { AuthorAggregate } from './AuthorAggregate';

@Injectable()
export class AuthorDispatcher {

	constructor(private authorAggregateRepository: AuthorAggregateRepository,
				private authorResource: AuthorResource) {}

	dispatch(command: LoadAuthorsCommand): void;
	dispatch(command: LoadAuthorsCommand): void {
		if (command instanceof LoadAuthorsCommand) {

			this.authorResource
				.fetchAll()
				.subscribe((aggregates: Array<AuthorAggregate>) => {

					this.authorAggregateRepository.save(aggregates);
				});
		}
	}

}
