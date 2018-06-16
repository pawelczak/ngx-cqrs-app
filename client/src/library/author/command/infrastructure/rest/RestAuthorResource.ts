import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthorAggregate } from '../../domain/AuthorAggregate';
import { AuthorResource } from '../../domain/AuthorResource';


@Injectable()
export class RestAuthorResource extends AuthorResource {

	fetchAll(): Observable<Array<AuthorAggregate>> {
		return of([
			new AuthorAggregate('a'),
			new AuthorAggregate('b'),
			new AuthorAggregate('c')
		]);
	}

}
