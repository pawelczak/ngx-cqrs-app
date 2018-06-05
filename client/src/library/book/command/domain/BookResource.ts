import { Observable } from 'rxjs';

import { BookAggregate } from './BookAggregate';

export abstract class BookResource {

	abstract fetchBooks(): Observable<Array<BookAggregate>>;

	abstract addBook(title: string): Observable<BookAggregate>;

	abstract updateBook(title: string): Observable<boolean>;

	abstract deleteBook(title: string): Observable<boolean>;
}
