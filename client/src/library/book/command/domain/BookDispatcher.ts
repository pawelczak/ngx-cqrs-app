import { BookAddCommand } from './add/BookAddCommand';
import { BookDeleteCommand } from './delete/BookDeleteCommand';
import { Command } from '../../../../util/cqrs/Command';

export abstract class BookDispatcher {

	abstract dispatch(command: Command): void;

	abstract fetchBooks(): void;

	abstract addBook(bookAddCommand: BookAddCommand): void;

	abstract deleteBook(bookDeleteCommand: BookDeleteCommand): void;

}
