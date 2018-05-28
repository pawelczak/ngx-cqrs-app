import { Observable } from 'rxjs';
import { BookDTO } from '../../command/domain/BookDTO';

export abstract class BookQueryResource {

	abstract fetchBooks(): Observable<Array<BookDTO>>;
}
