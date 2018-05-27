import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Book } from '../Book';
import { BooksRepository } from '../../infrastructure/BooksRepository';

@Component({
	selector: 'app-books',
	templateUrl: './BooksComponent.html',
	styleUrls: [
		'./BooksComponent.ngx.scss'
	]
})
export class BooksComponent implements OnInit, OnDestroy {

	books: Array<Book>;

	private unsubscribe$: Subject<void> = new Subject<void>();

	constructor(private booksRepository: BooksRepository) {
	}

	ngOnInit() {
		this.booksRepository.selectBooks()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((books: Array<Book>) => {
				this.books = books;
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}
