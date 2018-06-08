import { BookState } from './BookState';
import { FetchAllBooksCommand, FetchAllBooksFailureCommand, FetchAllBooksSuccessCommand } from '../../domain/fetch/FetchBookCommands';
import { AddBookSuccessCommand } from '../../domain/add/AddBookCommands';
import { DeleteBookSuccessCommand } from '../../domain/delete/DeleteBookCommands';

const defaultState = new BookState();

export function bookReducer(state: BookState = defaultState, action: any): BookState {

	switch (action.type) {

		case FetchAllBooksCommand.type:

			return Object.assign(new BookState(), state, { fetching: true });

		case FetchAllBooksSuccessCommand.type:

			const allBooks = [...action.payload];

			return Object.assign(new BookState(), state, { books: allBooks, fetching: false, fetched: true });

		case FetchAllBooksFailureCommand.type:

			return Object.assign(new BookState(), state, { fetching: false });

		case AddBookSuccessCommand.type:

			const newBook = action.payload;

			return Object.assign(new BookState(), state, { books: [...state.books, newBook] });

		case DeleteBookSuccessCommand.type:

			const deletedBookTitle = action.payload;

			let books = state.books.filter((book) => book.title !== deletedBookTitle);

			return Object.assign(new BookState(), state, { books });

		default:
			return state;

	}

}
