import { Observable } from 'rxjs';

import { AuthorAggregate } from './AuthorAggregate';

export abstract class AuthorResource {

	abstract fetchAll(): Observable<Array<AuthorAggregate>>;

	abstract fetchRatings(ids: Array<string>): Observable<Array<number>>;

}
