import { AuthorState } from './AuthorState';
import { AuthorStoreAnemia } from './AuthorStoreAnemia';
import { AuthorsLoadedEvent } from '../../domain/AuthorEvents';

const defaultState = new AuthorState();

export function authorReducer(state: AuthorState = defaultState, action: any): AuthorState {

	switch (action.type) {

		case AuthorsLoadedEvent.type:

			const authors = action.payload as Array<AuthorStoreAnemia>;

			let authorsAsEntities = {};

			authors.forEach((author: AuthorStoreAnemia) => {
				authorsAsEntities[author.id] = author;
			});

			return Object.assign(new AuthorState(), state, { entities: authorsAsEntities });

		default:
			return state;

	}
}
