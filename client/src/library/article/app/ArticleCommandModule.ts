import { ModuleWithProviders, NgModule } from '@angular/core';

import { ArticleAggregateRepository } from '../domain/command/ArticleAggregateRepository';
import { NgrxArticleAggregateRepository } from '../infrastructure/ngrx/command/NgrxArticleAggregateRepository';

const providers = [
	{
		provide: ArticleAggregateRepository,
		useClass: NgrxArticleAggregateRepository
	}
];

@NgModule({
	imports: []
})
export class ArticleCommandModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ArticleCommandModule,
			providers: providers
		};
	}
}
