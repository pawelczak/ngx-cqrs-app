import { Observable } from 'rxjs';

import { Book } from './Book';

export abstract class BookRepository {

	abstract selectBooks(): Observable<Array<Book>>;

	// abstract selectBookById(): Observable<Book>;
}
