import { BookState } from './BookState';
import { FetchAllBooksCommand, FetchAllBooksFailureCommand, FetchAllBooksSuccessCommand } from '../../domain/fetch/FetchBookCommands';
import { AddBookSuccessCommand } from '../../domain/add/AddBookCommands';
import { DeleteBookSuccessCommand } from '../../domain/delete/DeleteBookCommands';
import { AnemicBook } from './AnemicBook';

const defaultState = new BookState();

export function bookReducer(state: BookState = defaultState, action: any): BookState {

	switch (action.type) {

		case FetchAllBooksCommand.type:

			return Object.assign(new BookState(), state, { fetching: true });

		case FetchAllBooksSuccessCommand.type:

			const allBooks = {};

			const fetchedBooks = action.payload as Array<AnemicBook>;

			fetchedBooks.forEach((book: AnemicBook) => {
				allBooks[book.id] = book;
			});

			return Object.assign(new BookState(), state, { entities: allBooks, fetching: false, fetched: true });

		case FetchAllBooksFailureCommand.type:

			return Object.assign(new BookState(), state, { fetching: false });

		case AddBookSuccessCommand.type:

			const newBook = action.payload,
				newState = {...state.entities};

			newState[newBook.id] = newBook;

			return Object.assign(new BookState(), state, { entities: newState });

		case DeleteBookSuccessCommand.type:

			const deletedBookId = action.payload as number,
				booksAfterDelete = {...state.entities};

			delete booksAfterDelete[deletedBookId];

			return Object.assign(new BookState(), state, { entities: booksAfterDelete });

		default:
			return state;

	}

}
