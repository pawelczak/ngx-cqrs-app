import { BookAddCommand } from './add/BookAddCommand';
import { BookDeleteCommand } from './delete/BookDeleteCommand';

export abstract class BookDispatcher {

	abstract fetchBooks(): void;

	abstract addBook(bookAddCommand: BookAddCommand): void;

	abstract deleteBook(bookDeleteCommand: BookDeleteCommand): void;

}
