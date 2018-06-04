import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { AnemicBook } from '../AnemicBook';
import { BookDTO } from '../BookDTO';

@Injectable()
export class BookFetchCommandHandler {

	constructor(private bookResource: BookResource) {
	}

	execute(): Observable<Array<AnemicBook>> {

		return this.bookResource
				   .fetchBooks()
				   .pipe(
					   map((books: Array<BookDTO>) => {

						   return books.map((book: AnemicBook) => {
							   return this.createBook(book);
						   });
					   })
					);
	}

	private createBook(book: BookDTO): AnemicBook {

		return new AnemicBook(
			book.title,
			this.calculateRating(book)
		);
	}

	private calculateRating(book: BookDTO): number {

		// DOMAIN LOGIC
		return Math.floor(book.title.length * 0.312) + book.title.charCodeAt(0) % 8;
	}
}