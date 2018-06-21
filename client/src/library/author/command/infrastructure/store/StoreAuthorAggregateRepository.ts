import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthorAggregateRepository } from '../../domain/AuthorAggregateRepository';
import { AuthorAggregate } from '../../domain/AuthorAggregate';
import { AuthorAggregateConverter } from './AuthorAggregateConverter';
import { AuthorsLoadedEvent } from '../../domain/AuthorEvents';

import { EventDispatcher } from '../../../util/cqrs/domain/event/EventDispatcher';

@Injectable()
export class StoreAuthorAggregateRepository extends AuthorAggregateRepository {

	constructor(private store: Store<any>,
				private eventDispatcher: EventDispatcher,
				private authorAggregateConverter: AuthorAggregateConverter) {
		super();
	}

	selectOne(authorId: string): Observable<AuthorAggregate> {
		return undefined;
	}

	selectAll(): Observable<Array<AuthorAggregate>> {
		return undefined;
	}

	save(author: AuthorAggregate): void;
	save(authors: Array<AuthorAggregate>): void;
	save(arg: any): void {

		if (Array.isArray(arg)) {

			const authors = arg as Array<AuthorAggregate>,
				anemicAuthors = this.authorAggregateConverter.toArrayAnemia(authors);

			this.eventDispatcher.dispatch(new AuthorsLoadedEvent(anemicAuthors));
		}
	}
}
