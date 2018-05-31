import { Injectable } from '@angular/core';

import { BookRatingRepository } from '../../domain/rating/BookRatingRepository';
import { AnemicBook } from '../../domain/AnemicBook';

@Injectable()
export class BookRatingRepositoryImpl extends BookRatingRepository {


	constructor() {
		super();
	}

	getRating(book: AnemicBook): Rating;
	getRating(title: string): Rating;
	getRating(title: string | AnemicBook): Rating {
		return new Rating();
	}
}