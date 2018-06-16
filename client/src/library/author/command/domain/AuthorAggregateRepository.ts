import { Observable } from 'rxjs';

import { AuthorAggregate } from './AuthorAggregate';

export abstract class AuthorAggregateRepository {

	abstract selectOne(authorId: string): Observable<AuthorAggregate>;

	abstract selectAll(): Observable<Array<AuthorAggregate>>;

	abstract save(author: AuthorAggregate): void;

	abstract save(authors: Array<AuthorAggregate>): void;
}
