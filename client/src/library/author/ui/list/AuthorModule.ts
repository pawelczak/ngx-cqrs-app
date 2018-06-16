import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { AuthorListComponent } from './AuthorListComponent';
import { authorReducer } from '../../command/infrastructure/store/AuthorReducer';
import { AuthorDispatcher } from '../../command/domain/AuthorDispatcher';

import { AuthorRepository } from '../../query/domain/AuthorRepository';
import { StoreAuthorRepository } from '../../query/infrastructure/StoreAuthorRepository';
import { AuthorResource } from '../../command/domain/AuthorResource';
import { RestAuthorResource } from '../../command/infrastructure/rest/RestAuthorResource';
import { AuthorAggregateRepository } from '../../command/domain/AuthorAggregateRepository';
import { StoreAuthorAggregateRepository } from '../../command/infrastructure/store/StoreAuthorAggregateRepository';


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

	AuthorDispatcher
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('library', {
			authors: authorReducer
		}),
		EffectsModule.forFeature([
		]),
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
