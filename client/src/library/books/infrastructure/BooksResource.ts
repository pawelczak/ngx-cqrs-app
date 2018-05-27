import { BookAnemia } from './BookAnemia';
import { Observable } from 'rxjs';

export abstract class BooksResource {

	abstract fetchBooks(): Observable<Array<BookAnemia>>;
}
