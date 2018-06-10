import { Observable } from 'rxjs';

import { Book } from './Book';

import { QueryRepository } from '../../../../util/cqrs/query/QueryRepository';

export abstract class BookRepository extends QueryRepository {

	abstract selectBooks(): Observable<Array<Book>>;

	// abstract selectBookById(): Observable<Book>;
}
