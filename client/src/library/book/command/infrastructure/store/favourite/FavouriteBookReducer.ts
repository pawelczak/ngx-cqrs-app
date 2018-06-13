import { FavouriteBookState } from './FavouriteBookState';
import {
	AddBookToFavouritesCommand, ReadFavouriteBookIdsCommand, ReadFavouriteBookIdsSuccessCommand,
	RemoveBookFromFavouritesCommand
} from '../../../domain/favourite/FavouriteCommands';

const defaultState = new FavouriteBookState();

export function favouriteBookReducer(state: FavouriteBookState = defaultState, action: any): FavouriteBookState {

	switch (action.type) {

		case ReadFavouriteBookIdsCommand.type:

			return Object.assign(new FavouriteBookState(), state, { fetching: true });

		case ReadFavouriteBookIdsSuccessCommand.type:

			const favourteBookIds = [...action.payload.payload] as Array<number>;

			return Object.assign(new FavouriteBookState(), state, { favourites: favourteBookIds, fetching: false, fetched: true });

		case AddBookToFavouritesCommand.type:

			const bookIdToAdd = action.payload.payload,
				favouriteIds = [...state.favourites, bookIdToAdd];

			return Object.assign(new FavouriteBookState(), state, { favourites: favouriteIds });

		case RemoveBookFromFavouritesCommand.type:

			let bookIdToRemove = action.payload.payload,
				newFavouriteIds = [...state.favourites];

			newFavouriteIds = newFavouriteIds.filter(id => id !== bookIdToRemove);

			return Object.assign(new FavouriteBookState(), state, { favourites: newFavouriteIds });

		default:
			return state;

	}

}
