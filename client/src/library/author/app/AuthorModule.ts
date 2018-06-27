import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { AuthorListComponent } from '../ui/list/AuthorListComponent';
import { authorReducer } from '../command/infrastructure/store/AuthorReducer';
import { AuthorQueryRepository } from '../query/domain/AuthorQueryRepository';
import { StoreAuthorQueryRepository } from '../query/infrastructure/StoreAuthorQueryRepository';
import { AuthorResource } from '../command/domain/AuthorResource';
import { RestAuthorResource } from '../command/infrastructure/rest/RestAuthorResource';
import { AuthorAggregateRepository } from '../command/domain/AuthorAggregateRepository';
import { StoreAuthorAggregateRepository } from '../command/infrastructure/store/StoreAuthorAggregateRepository';
import { AuthorAggregateConverter } from '../command/infrastructure/store/AuthorAggregateConverter';

import { CQRSModule } from '../util/cqrs/CQRSModule';
import { commandHandlerProviders } from '../command/domain/handlers/commandHandlerProviders';
import { AuthorPanelComponent } from '../ui/list/authorpanel/AuthorPanelComponent';
import { ArticleModule } from '../../article/app/ArticleModule';

const storeName = 'library';

const providers: Array<Provider> = [
	{
		provide: AuthorResource,
		useClass: RestAuthorResource
	},
	{
		provide: AuthorQueryRepository,
		useClass: StoreAuthorQueryRepository
	},
	{
		provide: AuthorAggregateRepository,
		useClass: StoreAuthorAggregateRepository
	},
	AuthorAggregateConverter,
	...commandHandlerProviders
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(storeName, {
			authors: authorReducer
		}),
		EffectsModule.forFeature([
		]),
		CQRSModule.forFeature({
			storeName: storeName,
			reducer: authorReducer
		}),

		ArticleModule.forRoot()
	],
	declarations: [
		AuthorListComponent,
		AuthorPanelComponent
	]
})
export class AuthorModule {

	static forRoot(config?: any): ModuleWithProviders {

		let rootProviders = [...providers];

		return {
			ngModule: AuthorModule,
			providers: rootProviders
		};
	}

}
