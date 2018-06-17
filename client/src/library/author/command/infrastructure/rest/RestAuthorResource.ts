import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthorAggregate } from '../../domain/AuthorAggregate';
import { AuthorResource } from '../../domain/AuthorResource';


@Injectable()
export class RestAuthorResource extends AuthorResource {

	fetchAll(): Observable<Array<AuthorAggregate>> {
		return of([
			new AuthorAggregate('1', 'a'),
			new AuthorAggregate('2', 'b'),
			new AuthorAggregate('3', 'c')
		]);
	}

	fetchRatings(ids: Array<string>): Observable<Array<number>> {
		return of([1, 2]);
	}

}
