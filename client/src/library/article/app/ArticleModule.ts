import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ArticleQueryRepository } from '../domain/query/ArticleQueryRepository';
import { NgrxArticleQueryRepository } from '../infrastructure/ngrx/query/NgrxArticleQueryRepository';
import { articleReducer } from '../infrastructure/ngrx/ArticleReducer';
import { CQRSModule } from '../../author/util/cqrs/CQRSModule';

const providers = [
	{
		provide: ArticleQueryRepository,
		useClass: NgrxArticleQueryRepository
	}
];

@NgModule({
	imports: [
		StoreModule.forFeature('articles', {
			articles: articleReducer
		}),
		EffectsModule.forFeature([
		]),
		CQRSModule.forFeature()
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
