import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { BookDTO } from '../BookDTO';
import { BookAddCommand } from './BookAddCommand';
import { AnemicBook } from '../AnemicBook';
import { BookAggregate } from '../BookAggregate';
import { BookDispatcher } from '../BookDispatcher';
import { BookAddSuccessCommand } from './BookAddSuccessCommand';

@Injectable()
export class BookAddCommandHandler {

	constructor(private bookResource: BookResource,
				private bookDispatcher: BookDispatcher) {
	}

	execute(bookAddCommand: BookAddCommand): Observable<void> {

		const title = bookAddCommand.title;

		return this.bookResource.addBook(title)
				   .pipe(
					   map((book: BookDTO) => {

						   const bookAggregate = new BookAggregate(book.title);
						   bookAggregate.calculateRating();

						   return new AnemicBook(bookAggregate.title, bookAggregate.rating);
					   }),
					   tap((anemicBook: AnemicBook) => {
							this.bookDispatcher.dispatch(new BookAddSuccessCommand(anemicBook));
					   }),
					   catchError((error) => {
						   return of(error);
					   })
				   );
	}

}
