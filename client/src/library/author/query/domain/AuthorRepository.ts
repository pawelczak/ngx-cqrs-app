import { Observable } from 'rxjs';

import { Author } from './Author';

// TODO Rename
export abstract class AuthorRepository {

	abstract selectAll(): Observable<Array<Author>>;

	abstract selectOne(): Observable<Author>;
}
