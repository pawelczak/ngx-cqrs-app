import { Book } from '../../../query/domain/Book';

export abstract class BookRatingRepository {

	abstract getRating(book: Book): Rating;
	abstract getRating(title: string): Rating;
}
