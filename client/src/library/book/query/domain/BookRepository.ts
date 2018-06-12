import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from './Book';

import { QueryRepository } from '../../../../util/cqrs/query/QueryRepository';

export abstract class BookRepository extends QueryRepository {

	selectBooks(): Observable<Array<Book>> {

		return combineLatest(
				this.selectBookEntities(),
				this.selectFavouriteBookIds()
			)
			.pipe(
				map((combinedValues) => {

					const entities = combinedValues[0] as { [key: number]: any },
						favouriteBookIds = combinedValues[1] as Array<number>;

					return Object.keys(entities)
								 .map(id => entities[id])
								 .map((book: any) => {
									 const favourite = favouriteBookIds.some((fid: number) => fid === book.id);
									 return new Book(book.id, book.title, book.rating, favourite);
								 });
				})
			);
	}

	abstract selectBookEntities(): Observable<{ [key: number]: any }>;

	abstract selectFavouriteBookIds(): Observable<Array<number>>;
}
