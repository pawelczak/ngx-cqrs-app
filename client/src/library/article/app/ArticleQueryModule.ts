import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgrxArticleQueryRepository } from '../infrastructure/ngrx/query/NgrxArticleQueryRepository';
import { ArticleQueryRepository } from '../domain/query/ArticleQueryRepository';

const providers = [
	{
		provide: ArticleQueryRepository,
		useClass: NgrxArticleQueryRepository
	}
];

@NgModule({
	imports: []
})
export class ArticleQueryModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ArticleQueryModule,
			providers: providers
		};
	}
}
