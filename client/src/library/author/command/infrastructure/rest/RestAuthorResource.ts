import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AuthorAggregate } from '../../domain/AuthorAggregate';
import { AuthorResource } from '../../domain/AuthorResource';
import { RestAuthorConverter } from './RestAuthorConverter';

import * as rawAuthors from './authors.json';

@Injectable()
export class RestAuthorResource extends AuthorResource {

	constructor(private restAuthorConverter: RestAuthorConverter) {
		super();
	}

	fetchAll(): Observable<Array<AuthorAggregate>> {

		const authors = (rawAuthors as any).authors;

		return of(
				this.restAuthorConverter.convertArray(authors)
			)
			.pipe(
				delay(1000)
			);
	}

	fetchAllRatings(): Observable<{ [key: number]: number }> {
		return of({
			1: 25,
			2: 36,
			3: 8
		})
			.pipe(
				delay(1500)
			);
	}

	updateRating(authorAggregate: AuthorAggregate): Observable<void> {
		return of(null);
	}

}
