import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { Book } from '../../../query/domain/Book';
import { BookDTO } from '../BookDTO';

@Injectable()
export class BookAddHandler {

	constructor(private bookResource: BookResource) {
	}

	handleAddCommand(title: string): Observable<Book> {

		return this.bookResource
				   .addBook(title)
				   .pipe(
					   map((book: BookDTO) => {
						   return this.createBook(title);
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
