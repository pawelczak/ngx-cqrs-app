import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { BookAnemia } from '../../infrastructure/store/BookAnemia';
import { Book } from '../../../query/domain/Book'; // TODO

@Injectable()
export class BookFetchHandler {

	constructor(private bookResource: BookResource) {
	}

	handleFetch(): Observable<Array<Book>> {

		return this.bookResource
				   .fetchBooks()
				   .pipe(
					   map((books: Array<BookAnemia>) => {

						   return books.map((book: BookAnemia) => {
							   return this.createBook(book.title);
						   });
					   })
					);
	}

	private createBook(title: string): Book {

		let book = new Book(title);

		book.rating = this.calculateRating(book);

		return book;
	}

	private calculateRating(book: Book): number {

		// DOMAIN LOGIC
		return Math.floor(book.title.length * 0.312) + book.title.charCodeAt(0) % 8;
	}
}