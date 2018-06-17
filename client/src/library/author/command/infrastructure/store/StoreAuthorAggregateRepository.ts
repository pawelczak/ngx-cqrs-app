import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthorAggregateRepository } from '../../domain/AuthorAggregateRepository';
import { AuthorAggregate } from '../../domain/AuthorAggregate';
import { AuthorsLoadedEvent } from '../../domain/load/AuthorsLoadedEvent';
import { AuthorAggregateConverter } from './AuthorAggregateConverter';

@Injectable()
export class StoreAuthorAggregateRepository extends AuthorAggregateRepository {

	constructor(private store: Store<any>,
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

			this.store.dispatch({
				type: AuthorsLoadedEvent.type,
				payload: anemicAuthors
			});
		}
	}
}
