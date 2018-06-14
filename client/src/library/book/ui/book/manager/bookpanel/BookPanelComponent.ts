import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Book } from '../../../../query/domain/Book';
import { AddBookToFavouritesCommand, RemoveBookFromFavouritesCommand } from '../../../../command/domain/favourite/FavouriteCommands';
import { DeleteBookCommand } from '../../../../command/domain/delete/DeleteBookCommands';
import { FavouriteBookDispatcher } from '../../../../command/domain/favourite/FavouriteBookDispatcher';
import { BookCommandDispatcher } from '../../../../command/domain/BookCommandDispatcher';

@Component({
	selector: 'cqrs-book-panel',
	templateUrl: './BookPanelComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookPanelComponent {

	@Input()
	book: Book;

	constructor(private bookDispatcher: BookCommandDispatcher,
				private favouriteBookDispatcher: FavouriteBookDispatcher) {
	}

	deleteBook(book: Book): void {
		this.bookDispatcher.dispatch(new DeleteBookCommand(book.id));
	}

	addBookToFavourites(book: Book): void {
		this.favouriteBookDispatcher.dispatch(new AddBookToFavouritesCommand(book.id));
	}

	removeBookFromFavourites(book: Book): void {
		this.favouriteBookDispatcher.dispatch(new RemoveBookFromFavouritesCommand(book.id));
	}
}
