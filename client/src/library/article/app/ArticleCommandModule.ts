import { ModuleWithProviders, NgModule } from '@angular/core';

import { ArticleAggregateRepository } from '../domain/command/ArticleAggregateRepository';
import { NgrxArticleAggregateRepository } from '../infrastructure/ngrx/command/NgrxArticleAggregateRepository';
import { COMMAND_HANDLERS } from '../../author/util/cqrs/domain/command/COMMAND_HANDLERS';
import { FetchArticlesCommandHandler } from '../domain/command/fetch/FetchArticlesCommandHandler';

const providers = [
	{
		provide: ArticleAggregateRepository,
		useClass: NgrxArticleAggregateRepository
	}, {
		provide: COMMAND_HANDLERS,
		useClass: FetchArticlesCommandHandler,
		multi: true
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
