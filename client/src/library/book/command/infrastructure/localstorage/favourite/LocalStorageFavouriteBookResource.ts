import { Injectable } from '@angular/core';

import { FavouriteBookResource } from '../../../domain/favourite/FavouriteBookResource';

@Injectable()
export class LocalStorageFavouriteBookResource extends FavouriteBookResource {

	private key = 'lib-book-favourites';

	getFavouriteBookIds(): Array<number> {
		let ids = JSON.parse(localStorage.getItem(this.key));

		if (!ids) {
			ids = [];
		}

		return ids;
	}

	addFavouriteBook(id: number): void {
		const ids = [...this.getFavouriteBookIds(), id];

		localStorage.setItem(this.key, JSON.stringify(ids));
	}

	removeFavouriteBook(id: number): void {
		let ids = this.getFavouriteBookIds();

		ids = ids.filter((f) => f !== id);

		localStorage.setItem(this.key, JSON.stringify(ids));
	}
}
