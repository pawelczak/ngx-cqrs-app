import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { BookDTO } from '../BookDTO';
import { BookAddCommand } from './BookAddCommand';
import { AnemicBook } from '../AnemicBook';

@Injectable()
export class BookAddHandler {

	constructor(private bookResource: BookResource) {
	}

	handleAddCommand(bookAddCommand: BookAddCommand): Observable<AnemicBook> {

		const title = bookAddCommand.title;

		return this.bookResource
				   .addBook(title)
				   .pipe(
					   map((book: BookDTO) => {
						   return this.createBook(book);
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
