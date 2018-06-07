import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookResource } from '../../../command/domain/BookResource';
import { RestBookResource } from '../../../command/infrastructure/rest/RestBookResource';
import { BookDispatcher } from '../../../command/domain/BookDispatcher';
import { DeleteBookCommandHandler } from '../../../command/domain/delete/DeleteBookCommandHandler';
import { BookComponent } from './BookComponent';
import { StoreBookRepository } from '../../../query/infrastructure/store/StoreBookRepository';
import { bookReducer } from '../../../command/infrastructure/store/BookReducer';
import { AddCommandHandler } from '../../../command/domain/add/AddBookCommandHandler';
import { FetchAllBooksCommandHandler } from '../../../command/domain/fetch/FetchAllBooksCommandHandler';
import { BookRepository } from '../../../query/domain/BookRepository';
import { StoreBookAddCommandHandler } from '../../../command/infrastructure/store/add/StoreBookAddCommandHandler';
import { StoreBookDeleteCommandHandler } from '../../../command/infrastructure/store/delete/StoreBookDeleteCommandHandler';
import { StoreBookFetchCommandHandler } from '../../../command/infrastructure/store/fetch/StoreBookFetchCommandHandler';
import { StoreBookDispatcher } from '../../../command/infrastructure/store/StoreBookDispatcher';

const providers: Array<Provider> = [
	{
		provide: BookDispatcher,
		useClass: StoreBookDispatcher
	},
	{
		provide: BookRepository,
		useClass: StoreBookRepository
	},
	AddCommandHandler,
	DeleteBookCommandHandler,
	FetchAllBooksCommandHandler
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('library', {
			books: bookReducer
		}),
		EffectsModule.forFeature([
			StoreBookAddCommandHandler,
			StoreBookDeleteCommandHandler,
			StoreBookFetchCommandHandler
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
