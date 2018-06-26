import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { AuthorListComponent } from './AuthorListComponent';
import { authorReducer } from '../../command/infrastructure/store/AuthorReducer';
import { AuthorQueryRepository } from '../../query/domain/AuthorQueryRepository';
import { StoreAuthorQueryRepository } from '../../query/infrastructure/StoreAuthorQueryRepository';
import { AuthorResource } from '../../command/domain/AuthorResource';
import { RestAuthorResource } from '../../command/infrastructure/rest/RestAuthorResource';
import { AuthorAggregateRepository } from '../../command/domain/AuthorAggregateRepository';
import { StoreAuthorAggregateRepository } from '../../command/infrastructure/store/StoreAuthorAggregateRepository';
import { AuthorAggregateConverter } from '../../command/infrastructure/store/AuthorAggregateConverter';

import { CQRSModule } from '../../util/cqrs/CQRSModule';
import { CqrsStrategy } from '../../util/cqrs/CqrsStrategy';
import { commandHandlerProviders } from '../../command/domain/handlers/commandHandlerProviders';
import { ArticleModule } from '../../../article/app/ArticleModule';
import { AuthorPanelComponent } from './authorpanel/AuthorPanelComponent';

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
		StoreModule.forFeature('library', {
			authors: authorReducer
		}),
		EffectsModule.forFeature([
		]),
		CQRSModule.forFeature(),
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
