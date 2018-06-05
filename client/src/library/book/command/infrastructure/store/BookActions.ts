import { Action } from '@ngrx/store';
import { AnemicBook } from './AnemicBook';

const PREFIX = '[Books]';

export const ActionTypes = {
	FETCH_ALL_BOOKS: `${PREFIX}FETCH_ALL_BOOKS`,
	FETCH_ALL_BOOKS_SUCCESS: `${PREFIX}FETCH_ALL_BOOKS_SUCCESS`,
	FETCH_ALL_BOOKS_FAILURE: `${PREFIX}FETCH_ALL_BOOKS_FAILURE`,

	ADD_BOOK: `${PREFIX}ADD_BOOK`,
	ADD_BOOK_SUCCESS: `${PREFIX}ADD_BOOK_SUCCESS`,
	ADD_BOOK_FAILURE: `${PREFIX}ADD_BOOK_FAILURE`,

	DELETE_BOOK: `${PREFIX}DELETE_BOOK`,
	DELETE_BOOK_SUCCESS: `${PREFIX}DELETE_BOOK_SUCCESS`,
	DELETE_BOOK_FAILURE: `${PREFIX}DELETE_BOOK_FAILURE`
};

export class FetchAllBooksAction implements Action {
	readonly type = ActionTypes.FETCH_ALL_BOOKS;

	constructor(public payload?: any) {
	}
}

export class FetchAllBooksSuccessAction implements Action {
	readonly type = ActionTypes.FETCH_ALL_BOOKS_SUCCESS;

	constructor(public payload?: any) {
	}
}

export class FetchAllBooksFailureAction implements Action {
	readonly type = ActionTypes.FETCH_ALL_BOOKS_FAILURE;

	constructor(public payload?: any) {
	}
}

export class AddBookAction implements Action {
	readonly type = ActionTypes.ADD_BOOK;

	constructor(public payload?: any) {
	}
}

export class AddBookSuccessAction implements Action {
	readonly type = ActionTypes.ADD_BOOK_SUCCESS;

	constructor(public payload: AnemicBook) {
	}
}

export class AddBookFailureAction implements Action {
	readonly type = ActionTypes.ADD_BOOK_FAILURE;

	constructor(public payload?: any) {
	}
}

export class DeleteBookAction implements Action {
	readonly type = ActionTypes.DELETE_BOOK;

	constructor(public payload?: any) {
	}
}

export class DeleteBookSuccessAction implements Action {
	readonly type = ActionTypes.DELETE_BOOK_SUCCESS;

	constructor(public payload?: any) {
	}
}

export class DeleteBookFailureAction implements Action {
	readonly type = ActionTypes.DELETE_BOOK_FAILURE;

	constructor(public payload?: any) {
	}
}

export type Actions = FetchAllBooksAction |
	FetchAllBooksSuccessAction |
	FetchAllBooksFailureAction |
	AddBookAction |
	AddBookSuccessAction |
	AddBookFailureAction |
	DeleteBookAction |
	DeleteBookSuccessAction |
	DeleteBookFailureAction;
