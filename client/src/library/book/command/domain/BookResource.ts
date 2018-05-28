import { Observable } from 'rxjs';

import { BookDTO } from './BookDTO';

export abstract class BookResource {

	abstract addBook(title: string): Observable<BookDTO>;

	abstract deleteBook(title: string): Observable<boolean>;
}
