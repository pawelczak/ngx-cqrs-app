import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { articleReducer } from '../infrastructure/ngrx/ArticleReducer';
import { CQRSModule } from '../../author/util/cqrs/CQRSModule';
import { ArticleCommandModule } from './ArticleCommandModule';
import { ArticleQueryModule } from './ArticleQueryModule';
import { ARTICLE_STORE_NAME } from '../infrastructure/ngrx/NgrxArticleStoreName';
import { NgrxArticleConverter } from '../infrastructure/ngrx/NgrxArticleConverter';
import { ArticleResource } from '../domain/command/ArticleResource';
import { RestArticleResource } from '../infrastructure/rest/RestArticleResource';
import { RestArticleConverter } from '../infrastructure/rest/RestArticleConverter';

const storeName = 'articles';

const providers: Array<Provider> = [
	{
		provide: ARTICLE_STORE_NAME,
		useValue: storeName
	}, {
		provide: ArticleResource,
		useClass: RestArticleResource
	},
	RestArticleConverter,
	NgrxArticleConverter
];

@NgModule({
	imports: [
		CQRSModule.forFeature({
			storeName: storeName,
			states: {
				articles: articleReducer
			}
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
