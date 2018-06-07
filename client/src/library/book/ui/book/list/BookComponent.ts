import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BookDispatcher } from '../../../command/domain/BookDispatcher';
import { Book } from '../../../query/domain/Book';
import { BookRepository } from '../../../query/domain/BookRepository';
import { DeleteBookCommand } from '../../../command/domain/delete/DeleteBookCommands';
import { AddBookCommand } from '../../../command/domain/add/AddBookCommands';
import { FetchAllBooksCommand } from '../../../command/domain/fetch/FetchBookCommands';

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
				private bookDispatcher: BookDispatcher) {
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
		this.bookDispatcher.dispatch(new DeleteBookCommand(book.title));
	}

	private initSaga(): void {
		this.bookDispatcher.dispatch(new FetchAllBooksCommand());
	}

}
