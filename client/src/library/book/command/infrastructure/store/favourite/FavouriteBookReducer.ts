import { FavouriteBookState } from './FavouriteBookState';
import {
	AddBookToFavouritesCommand, ReadFavouriteBookIdsCommand, ReadFavouriteBookIdsSuccessCommand,
	RemoveBookFromFavouritesCommand
} from '../../../domain/favourite/FavouriteCommands';
import { FetchAllBooksCommand } from '../../../domain/fetch/FetchBookCommands';
import { BookState } from '../BookState';

const defaultState = new FavouriteBookState();

export function favouriteBookReducer(state: FavouriteBookState = defaultState, action: any): FavouriteBookState {

	switch (action.type) {

		case FetchAllBooksCommand.type:

			return Object.assign(new BookState(), state, { fetching: true });

		case ReadFavouriteBookIdsSuccessCommand.type:

			return Object.assign(new BookState(), state, { favourites: [...action.payload.payload], fetching: false, fetched: true });

		case AddBookToFavouritesCommand.type:

			const bookIdToAdd = action.payload.bookId,
				favouriteIds = [...state.favourites, bookIdToAdd];

			return Object.assign(new FavouriteBookState(), state, { favourites: favouriteIds });

		case RemoveBookFromFavouritesCommand.type:

			let bookIdToRemove = action.payload.bookId,
				newFavouriteIds = [...state.favourites];

			newFavouriteIds = newFavouriteIds.filter(id => id !== bookIdToRemove);

			return Object.assign(new FavouriteBookState(), state, { favourites: newFavouriteIds });

		default:
			return state;

	}

}
