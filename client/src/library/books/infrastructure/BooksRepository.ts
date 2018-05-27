import { Observable } from 'rxjs';

import { Book } from '../ui/Book';

export abstract class BooksRepository {

	abstract selectBooks(): Observable<Array<Book>>;
}
