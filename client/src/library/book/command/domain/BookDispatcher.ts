export abstract class BookDispatcher {

	abstract fetchBooks(): void;

	abstract addBook(title: string): void;

	abstract deleteBook(title: string): void;

}
