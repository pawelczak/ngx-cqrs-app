import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookResource } from '../../../command/domain/BookResource';
import { RestBookResource } from '../../../command/infrastructure/rest/RestBookResource';
import { BookCommandDispatcher } from '../../../command/domain/BookCommandDispatcher';
import { DeleteBookCommandHandler } from '../../../command/domain/delete/DeleteBookCommandHandler';
import { BookManagerComponent } from './BookManagerComponent';
import { StoreBookRepository } from '../../../query/infrastructure/store/StoreBookRepository';
import { bookReducer } from '../../../command/infrastructure/store/BookReducer';
import { AddBookCommandHandler } from '../../../command/domain/add/AddBookCommandHandler';
import { FetchAllBooksCommandHandler } from '../../../command/domain/fetch/FetchAllBooksCommandHandler';
import { BookRepository } from '../../../query/domain/BookRepository';
import { StoreBookAddCommandHandler } from '../../../command/infrastructure/store/add/StoreBookAddCommandHandler';
import { StoreBookDeleteCommandHandler } from '../../../command/infrastructure/store/delete/StoreBookDeleteCommandHandler';
import { StoreBookFetchCommandHandler } from '../../../command/infrastructure/store/fetch/StoreBookFetchCommandHandler';
import { StoreBookDispatcher } from '../../../command/infrastructure/store/StoreBookDispatcher';
import { AddBookToFavouritesHandler } from '../../../command/domain/favourite/AddBookToFavouritesHandler';
import { FavouriteBookResource } from '../../../command/domain/favourite/FavouriteBookResource';
import { LocalStorageFavouriteBookResource } from '../../../command/infrastructure/localstorage/favourite/LocalStorageFavouriteBookResource';
import { favouriteBookReducer } from '../../../command/infrastructure/store/favourite/FavouriteBookReducer';
import { ReadFavouriteBookIdsHandler } from '../../../command/domain/favourite/ReadFavouriteBookIdsHandler';
import { FavouriteBookDispatcher } from '../../../command/domain/favourite/FavouriteBookDispatcher';
import { StoreFavouriteBookDispatcher } from '../../../command/infrastructure/store/favourite/StoreFavouriteBookDispatcher';
import { RemoveBookFromFavouritesHandler } from '../../../command/domain/favourite/RemoveBookFromFavouritesHandler';

import { CqrsModule } from '../../../../../util/cqrs/ui/CqrsModule';
import { BookPanelComponent } from './bookpanel/BookPanelComponent';
import { STORE_BOOK_NAME } from '../../../command/infrastructure/store/StoreBookNameToken';


const bookStoreName = 'library';

const handlers = [
	// book handlers
	AddBookCommandHandler,
	DeleteBookCommandHandler,
	FetchAllBooksCommandHandler,

	// favourite book handlers
	AddBookToFavouritesHandler,
	ReadFavouriteBookIdsHandler,
	RemoveBookFromFavouritesHandler
];

const providers: Array<Provider> = [
	{
		provide: STORE_BOOK_NAME,
		useValue: bookStoreName
	},
	{
		provide: BookCommandDispatcher,
		useClass: StoreBookDispatcher
	},
	{
		provide: BookRepository,
		useClass: StoreBookRepository
	},
	{
		provide: FavouriteBookResource,
		useClass: LocalStorageFavouriteBookResource
	},
	{
		provide: FavouriteBookDispatcher,
		useClass: StoreFavouriteBookDispatcher
	},
	...handlers
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(bookStoreName, {
			books: bookReducer,
			favourites: favouriteBookReducer
		}),
		EffectsModule.forFeature([
			StoreBookAddCommandHandler,
			StoreBookDeleteCommandHandler,
			StoreBookFetchCommandHandler
		]),
		CqrsModule.forRoot()
	],
	declarations: [
		BookManagerComponent,
		BookPanelComponent
	],
	exports: []
})
export class BookManagerModule {

	constructor(private addBookToFavouritesHandler: AddBookToFavouritesHandler,
				private removeBookFromFavouritesHandler: RemoveBookFromFavouritesHandler,
				private readFavouriteBookIdsHandler: ReadFavouriteBookIdsHandler) {}

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
			ngModule: BookManagerModule,
			providers: rootProviders
		};
	}

}
