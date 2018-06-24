import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AuthorAggregate } from '../../domain/AuthorAggregate';
import { AuthorResource } from '../../domain/AuthorResource';


@Injectable()
export class RestAuthorResource extends AuthorResource {

	fetchAll(): Observable<Array<AuthorAggregate>> {
		return of([
				new AuthorAggregate('1', 'a'),
				new AuthorAggregate('2', 'b'),
				new AuthorAggregate('3', 'c')
			])
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
