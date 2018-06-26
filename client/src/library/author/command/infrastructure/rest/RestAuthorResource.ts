import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AuthorAggregate } from '../../domain/AuthorAggregate';
import { AuthorResource } from '../../domain/AuthorResource';
import { ArticleContribution } from '../../domain/ArticleContribution';


@Injectable()
export class RestAuthorResource extends AuthorResource {

	fetchAll(): Observable<Array<AuthorAggregate>> {
		return of([
				new AuthorAggregate('1', 'a', [new ArticleContribution('a@1')]),
				new AuthorAggregate('2', 'b', [new ArticleContribution('a@2')]),
				new AuthorAggregate('3', 'c', [new ArticleContribution('a@3')])
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
