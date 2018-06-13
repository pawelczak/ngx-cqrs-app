import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BookCommandDispatcher } from '../../../command/domain/BookCommandDispatcher';
import { Book } from '../../../query/domain/Book';
import { BookRepository } from '../../../query/domain/BookRepository';
import { DeleteBookCommand } from '../../../command/domain/delete/DeleteBookCommands';
import { AddBookCommand } from '../../../command/domain/add/AddBookCommands';
import { FetchAllBooksCommand } from '../../../command/domain/fetch/FetchBookCommands';
import { AddBookToFavouritesCommand, ReadFavouriteBookIdsCommand, RemoveBookFromFavouritesCommand } from '../../../command/domain/favourite/FavouriteCommands';
import { FavouriteBookDispatcher } from '../../../command/domain/favourite/FavouriteBookDispatcher';

@Component({
	selector: 'app-book',
	templateUrl: './BookComponent.html',
	styleUrls: [
		'./BookComponent.ngx.scss'
	]
})
export class BookComponent implements OnInit, OnDestroy {

	books: Array<Book>;

	private unsubscribe$: Subject<void> = new Subject<void>();

	constructor(private bookRepository: BookRepository,
				private bookDispatcher: BookCommandDispatcher,
				private favouriteBookDispatcher: FavouriteBookDispatcher) {
	}

	ngOnInit() {
		this.bookRepository
			.selectBooks()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((books: Array<Book>) => {
				this.books = books;
			});

		this.initSaga();
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	addBook(): void {
		this.bookDispatcher.dispatch(new AddBookCommand('New Book' + Date.now()));
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

	private initSaga(): void {
		this.bookDispatcher.dispatch(new FetchAllBooksCommand());
		this.favouriteBookDispatcher.dispatch(new ReadFavouriteBookIdsCommand());
	}

}
