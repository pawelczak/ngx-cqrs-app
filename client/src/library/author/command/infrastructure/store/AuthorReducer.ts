import { AuthorState } from './AuthorState';
import { AuthorsLoadedEvent } from '../../domain/load/AuthorsLoadedEvent';
import { AuthorStoreAnemia } from './AuthorStoreAnemia';

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
