import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Book } from '../query/Book';
import { BookAnemia } from '../infrastructure/store/BookAnemia';
import { BookResource } from './BookCommandResource';
import { ActionTypes, AddBookSuccessAction, FetchAllBookFailureAction, FetchAllBookSuccessAction } from '../infrastructure/store/BookActions';


@Injectable()
export class BookHandler {

	constructor(private actions$: Actions,
				private bookCommandResource: BookResource) {
	}

	@Effect()
	fetchBooks$ = this.actions$
					  .ofType(ActionTypes.FETCH_ALL_BOOK)
					  .pipe(
						  switchMap(() => {
							  return this.bookCommandResource
										 .fetchBooks()
										 .pipe(
											 map((books: Array<BookAnemia>) => {

												 let fetchedBooks = books.map((book: BookAnemia) => {
													 return this.createBook(book.title);
												 });

												 return new FetchAllBookSuccessAction(fetchedBooks);
											 }),
											 catchError((error: any) => {
												 return of(new FetchAllBookFailureAction(error));
											 })
										 );
						  })
					  );

	@Effect()
	addBook$ = this.actions$
				   .ofType(ActionTypes.ADD_BOOK)
				   .pipe(
					   switchMap((action: any) => {
						   let title = action.payload;

						   let book = this.createBook(title);

						   return of(new AddBookSuccessAction(book));
					   })
				   );

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