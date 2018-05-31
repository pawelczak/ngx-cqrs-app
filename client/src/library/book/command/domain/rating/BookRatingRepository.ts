import { AnemicBook } from '../AnemicBook';

export abstract class BookRatingRepository {

	abstract getRating(book: AnemicBook): Rating;
	abstract getRating(title: string): Rating;
}
