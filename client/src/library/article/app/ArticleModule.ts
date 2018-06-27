import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { articleReducer } from '../infrastructure/ngrx/ArticleReducer';
import { CQRSModule } from '../../author/util/cqrs/CQRSModule';
import { ArticleCommandModule } from './ArticleCommandModule';
import { ArticleQueryModule } from './ArticleQueryModule';
import { ARTICLE_STORE_NAME } from '../infrastructure/ngrx/NgrxArticleStoreName';

const storeName = 'articles';

const providers: Array<Provider> = [
	{
		provide: ARTICLE_STORE_NAME,
		useValue: storeName
	}
];

@NgModule({
	imports: [
		StoreModule.forFeature(storeName, {
			articles: articleReducer
		}),
		CQRSModule.forFeature({
			storeName: storeName,
			reducer: articleReducer
		}),

		ArticleCommandModule.forRoot(),
		ArticleQueryModule.forRoot()
	]
})
export class ArticleModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ArticleModule,
			providers: providers
		};
	}
}
