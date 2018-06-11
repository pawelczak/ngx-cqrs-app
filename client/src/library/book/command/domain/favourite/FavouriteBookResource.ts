export abstract class FavouriteBookResource {

	abstract getFavouriteBookIds(): Array<number>;

	abstract addFavouriteBook(id: number): void;

	abstract removeFavouriteBook(id: number): void;
}
