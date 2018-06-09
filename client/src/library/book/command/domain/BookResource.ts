import { Observable } from 'rxjs';

import { BookAggregate } from './BookAggregate';

export abstract class BookResource {

	abstract fetchAll(): Observable<Array<BookAggregate>>;

	abstract addBook(title: string): Observable<BookAggregate>;

	abstract updateBook(title: string): Observable<void>;

	abstract deleteBook(id: number): Observable<void>;
}
