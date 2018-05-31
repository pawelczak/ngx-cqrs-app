import { Injectable } from '@angular/core';

import { BookRatingRepository } from '../../domain/rating/BookRatingRepository';
import { Book } from '../../../query/domain/Book';

@Injectable()
export class BookRatingRepositoryImpl extends BookRatingRepository {


	constructor() {
		super();
	}

	getRating(book: Book): Rating;
	getRating(title: string): Rating;
	getRating(title: string | Book): Rating {
		return new Rating();
	}
}