import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { AuthorListComponent } from './AuthorListComponent';
import { authorReducer } from '../../command/infrastructure/store/AuthorReducer';

import { AuthorRepository } from '../../query/domain/AuthorRepository';
import { StoreAuthorRepository } from '../../query/infrastructure/StoreAuthorRepository';
import { AuthorResource } from '../../command/domain/AuthorResource';
import { RestAuthorResource } from '../../command/infrastructure/rest/RestAuthorResource';
import { AuthorAggregateRepository } from '../../command/domain/AuthorAggregateRepository';
import { StoreAuthorAggregateRepository } from '../../command/infrastructure/store/StoreAuthorAggregateRepository';
import { AuthorAggregateConverter } from '../../command/infrastructure/store/AuthorAggregateConverter';
import { CQRSModule } from '../../util/cqrs/CQRSModule';
import { COMMAND_HANDLERS } from '../../util/cqrs/domain/COMMAND_HANDLERS';
import { LoadAuthorCommandHandler } from '../../command/domain/handlers/LoadAuthorCommandHandler';
import { CqrsStrategy } from '../../util/cqrs/CqrsStrategy';


const providers: Array<Provider> = [
	{
		provide: AuthorResource,
		useClass: RestAuthorResource
	},
	{
		provide: AuthorRepository,
		useClass: StoreAuthorRepository
	},
	{
		provide: AuthorAggregateRepository,
		useClass: StoreAuthorAggregateRepository
	},
	AuthorAggregateConverter,
	{
		provide: COMMAND_HANDLERS,
		useClass: LoadAuthorCommandHandler,
		multi: true
	}
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('library', {
			authors: authorReducer
		}),
		EffectsModule.forFeature([
		]),
		CQRSModule.forRoot(CqrsStrategy.NGRX)
	],
	declarations: [
		AuthorListComponent
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
