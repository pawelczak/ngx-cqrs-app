import { ArticleState } from './ArticleState';
import { ArticlesFetchedEvent } from '../../domain/command/fetch/ArticlesFetchedEvent';
import { ArticleStoreAnemia } from './ArticleStoreAnemia';

const defaultState = new ArticleState();

export function articleReducer(state: ArticleState = defaultState, action: any): ArticleState {

	switch (action.type) {

		case ArticlesFetchedEvent.type:

			const articles = action.payload.data as Array<ArticleStoreAnemia>;

			let articlesAsEntities = {};

			articles.forEach((article: ArticleStoreAnemia) => {
				articlesAsEntities[article.id] = article;
			});

			return Object.assign(new ArticleState(), state, { entities: articlesAsEntities });

		default:
			return state;

	}

}
