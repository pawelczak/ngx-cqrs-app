import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthorAggregateRepository } from '../../domain/AuthorAggregateRepository';
import { AuthorAggregate } from '../../domain/AuthorAggregate';
import { AuthorsLoadedEvent } from '../../domain/load/AuthorsLoadedEvent';

@Injectable()
export class StoreAuthorAggregateRepository extends AuthorAggregateRepository {

	constructor(private store: Store<any>) {
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

			const authors = arg as Array<AuthorAggregate>;

			this.store.dispatch({
				type: AuthorsLoadedEvent.type,
				payload: authors // toAnemia
			});


		}


	}



}