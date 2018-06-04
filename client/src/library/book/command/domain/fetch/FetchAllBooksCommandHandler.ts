import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookResource } from '../BookResource';
import { BookAggregate } from '../BookAggregate';

@Injectable()
export class FetchAllBooksCommandHandler {

	constructor(private bookResource: BookResource) {
	}

	execute(): Observable<Array<BookAggregate>> {

		return this.bookResource
				   .fetchAll()
				   .pipe(
					   map((books: Array<BookAggregate>) => {

						   books.forEach((bookAggregate: BookAggregate) => {
							   bookAggregate.calculateRating();
						   });

						   return books;
					   })
				   );
	}
}
