import { Observable } from 'rxjs';

import { AuthorAggregate } from './AuthorAggregate';

export abstract class AuthorResource {

	abstract fetchAll(): Observable<Array<AuthorAggregate>>;

	abstract fetchAllRatings(): Observable<{[key: number]: number}>;

	abstract updateRating(authorAggregate: AuthorAggregate): Observable<void>;
}
