import { AuthorState } from './AuthorState';
import { AuthorsLoadedEvent } from '../../domain/load/AuthorsLoadedEvent';
import { AuthorStoreAnemia } from './AuthorStoreAnemia';

const defaultState = new AuthorState();

export function authorReducer(state: AuthorState = defaultState, action: any): AuthorState {

	switch (action.type) {

		case AuthorsLoadedEvent.type:

			const authors = action.payload as Array<AuthorStoreAnemia>;

			return Object.assign(new AuthorState(), state, { entities: authors });

		default:
			return state;

	}

}