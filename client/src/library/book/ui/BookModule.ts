import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookResource } from '../command/domain/BookResource';
import { RestBookResource } from '../command/infrastructure/rest/RestBookResource';
import { BookDispatcher } from '../command/domain/BookDispatcher';
import { BookDeleteHandler } from '../command/domain/delete/BookDeleteHandler';
import { BookComponent } from './book/BookComponent';
import { StoreBookRepository } from '../query/infrastructure/store/StoreBookRepository';
import { bookReducer } from '../command/infrastructure/store/BookReducer';
import { BookAddHandler } from '../command/domain/add/BookAddHandler';
import { BookFetchHandler } from '../command/domain/fetch/BookFetchHandler';
import { BookRepository } from '../query/domain/BookRepository';
import { StoreBookAddHandler } from '../command/infrastructure/store/handlers/StoreBookAddHandler';
import { StoreBookDeleteHandler } from '../command/infrastructure/store/handlers/StoreBookDeleteHandler';
import { StoreBookFetchHandler } from '../command/infrastructure/store/handlers/StoreBookFetchHandler';
import { StoreBookDispatcher } from '../command/infrastructure/store/StoreBookDispatcher';

const providers: Array<Provider> = [
	{
		provide: BookDispatcher,
		useClass: StoreBookDispatcher
	},
	{
		provide: BookRepository,
		useClass: StoreBookRepository
	},
	BookAddHandler,
	BookDeleteHandler,
	BookFetchHandler
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('library', {
			books: bookReducer
		}),
		EffectsModule.forFeature([
			StoreBookAddHandler,
			StoreBookDeleteHandler,
			StoreBookFetchHandler
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
					useClass: RestBookResource
				} as Provider];
		}

		return {
			ngModule: BookModule,
			providers: rootProviders
		};
	}

}
