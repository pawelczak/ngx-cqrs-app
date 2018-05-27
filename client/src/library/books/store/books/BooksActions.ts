import { Action } from '@ngrx/store';

const PREFIX = '[Books]';

export const ActionTypes = {
	FETCH_ALL_BOOKS: `${PREFIX}FETCH_ALL_BOOKS`,
	FETCH_ALL_BOOKS_SUCCESS: `${PREFIX}FETCH_ALL_BOOKS_SUCCESS`,
	FETCH_ALL_BOOKS_FAILURE: `${PREFIX}FETCH_ALL_BOOKS_FAILURE`,
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

export type Actions = FetchAllBooksAction |
	FetchAllBooksSuccessAction |
	FetchAllBooksFailureAction;
