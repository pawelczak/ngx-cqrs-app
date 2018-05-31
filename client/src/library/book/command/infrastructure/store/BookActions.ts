import { Action } from '@ngrx/store';

const PREFIX = '[Books]';

export const ActionTypes = {
	FETCH_ALL_BOOK: `${PREFIX}FETCH_ALL_BOOK`,
	FETCH_ALL_BOOK_SUCCESS: `${PREFIX}FETCH_ALL_BOOK_SUCCESS`,
	FETCH_ALL_BOOK_FAILURE: `${PREFIX}FETCH_ALL_BOOK_FAILURE`,

	ADD_BOOK: `${PREFIX}ADD_BOOK`,
	ADD_BOOK_SUCCESS: `${PREFIX}ADD_BOOK_SUCCESS`,
	ADD_BOOK_FAILURE: `${PREFIX}ADD_BOOK_FAILURE`,

	DELETE_BOOK: `${PREFIX}DELETE_BOOK`,
	DELETE_BOOK_SUCCESS: `${PREFIX}DELETE_BOOK_SUCCESS`,
	DELETE_BOOK_FAILURE: `${PREFIX}DELETE_BOOK_FAILURE`
};

export class FetchAllBookAction implements Action {
	readonly type = ActionTypes.FETCH_ALL_BOOK;

	constructor(public payload?: any) {
	}
}

export class FetchAllBookSuccessAction implements Action {
	readonly type = ActionTypes.FETCH_ALL_BOOK_SUCCESS;

	constructor(public payload?: any) {
	}
}

export class FetchAllBookFailureAction implements Action {
	readonly type = ActionTypes.FETCH_ALL_BOOK_FAILURE;

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

	constructor(public payload?: any) {
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

export type Actions = FetchAllBookAction |
	FetchAllBookSuccessAction |
	FetchAllBookFailureAction |
	AddBookAction |
	AddBookSuccessAction |
	AddBookFailureAction |
	DeleteBookAction |
	DeleteBookSuccessAction |
	DeleteBookFailureAction;
