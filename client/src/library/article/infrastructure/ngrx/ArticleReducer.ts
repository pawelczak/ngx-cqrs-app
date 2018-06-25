import { ArticleState } from './ArticleState';

const defaultState = new ArticleState();

export function articleReducer(state: ArticleState = defaultState, action: any): ArticleState {

	switch (action.type) {


		default:
			return state;

	}

}
