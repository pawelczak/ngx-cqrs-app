import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineReducers, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookResource } from '../command/domain/BookCommandResource';
import { RestBookCommandResource } from '../command/infrastructure/rest/RestBookCommandResource';
import { BookDispatcher } from '../command/domain/BookDispatcher';
import { BookHandler } from '../command/domain/BookHandler';
import { BookDeleteHandler } from '../command/domain/BookDeleteHandler';
import { BookComponent } from './book/BookComponent';
import { BookRepository } from '../query/BookRepository';
import { StoreBookRepository } from '../query/infrastructure/store/StoreBookRepository';
import { bookReducer } from '../command/infrastructure/store/BookReducer';

const providers: Array<Provider> = [
	BookDispatcher,
	BookHandler,
	{
		provide: BookRepository,
		useClass: StoreBookRepository
	}
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('library', {
			books: combineReducers(bookReducer)
		}),
		EffectsModule.forFeature([
			BookHandler,
			BookDeleteHandler
		])
	],
	declarations: [
		BookComponent
	],
	exports: []
})
export class BookModule {

	static forRoot(config?: any): ModuleWithProviders {

		let rootProviders = [...providers];

		if (config.rest === true) {
			rootProviders = [
				...rootProviders,
				{
					provide: BookResource,
					useClass: RestBookCommandResource
				} as Provider];
		}

		return {
			ngModule: BookModule,
			providers: rootProviders
		};
	}

}
