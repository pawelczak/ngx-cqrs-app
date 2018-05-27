import { Component, OnInit } from '@angular/core';

import { BooksRepository } from '../../store/books/BooksRepository';
import { Book } from '../Book';

@Component({
	selector: 'app-books',
	templateUrl: './BooksComponent.html',
	styleUrls: [
		'./BooksComponent.ngx.scss'
	]
})
export class BooksComponent implements OnInit {

	private books: Array<Book>;

	constructor(private booksRepository: BooksRepository) {
	}

	ngOnInit() {
		this.booksRepository.selectBooks()
			.subscribe((books: Array<Book>) => {
				this.books = books;
			});
	}

}
