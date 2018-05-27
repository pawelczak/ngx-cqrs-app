import { BooksState } from './BooksState';
import * as Actions from './BooksActions';

const defaultState = new BooksState();

export function booksReducer(state: BooksState = defaultState, action: Actions.Actions): BooksState {

	switch (action.type) {

		case Actions.ActionTypes.FETCH_ALL_BOOKS:

			return Object.assign(new BooksState(), state, { fetching: true });

		case Actions.ActionTypes.FETCH_ALL_BOOKS_SUCCESS:

			const allBooks = [...action.payload];

			return Object.assign(new BooksState(), state, { books: allBooks, fetching: false, fetched: true });

		case Actions.ActionTypes.FETCH_ALL_BOOKS_FAILURE:

			return Object.assign(new BooksState(), state, { fetching: false });
			

		default:
			return state;

	}

}
