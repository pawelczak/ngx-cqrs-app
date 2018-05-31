import { Observable } from 'rxjs';

import { BookDTO } from './BookDTO';

export abstract class BookResource {

	abstract fetchBooks(): Observable<Array<BookDTO>>;

	abstract addBook(title: string): Observable<BookDTO>;

	abstract updateBook(title: string): Observable<boolean>;

	abstract deleteBook(title: string): Observable<boolean>;
}
