import { BookState } from './BookState';
import * as Actions from './BookActions';

const defaultState = new BookState();

export function bookReducer(state: BookState = defaultState, action: Actions.Actions): BookState {

	switch (action.type) {

		case Actions.ActionTypes.FETCH_ALL_BOOKS:

			return Object.assign(new BookState(), state, { fetching: true });

		case Actions.ActionTypes.FETCH_ALL_BOOKS_SUCCESS:

			console.log(action.payload);

			const allBooks = [...action.payload];

			return Object.assign(new BookState(), state, { books: allBooks, fetching: false, fetched: true });

		case Actions.ActionTypes.FETCH_ALL_BOOKS_FAILURE:

			return Object.assign(new BookState(), state, { fetching: false });

		case Actions.ActionTypes.ADD_BOOK_SUCCESS:

			const newBook = action.payload;

			return Object.assign(new BookState(), state, { books: [...state.books, newBook] });

		case Actions.ActionTypes.DELETE_BOOK_SUCCESS:

			const deletedBookTitle = action.payload;

			let books = state.books.filter((book) => book.title !== deletedBookTitle);

			return Object.assign(new BookState(), state, { books });

		default:
			return state;

	}

}
