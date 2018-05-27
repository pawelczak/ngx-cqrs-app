import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BooksComponent } from '../ui/books/BooksComponent';
import { booksReducer } from '../store/BooksReducer';
import { BooksEffects } from '../store/BooksEffects';
import { BooksResource } from '../infrastructure/BooksResource';
import { RestBooksResource } from '../rest/RestBooksResource';
import { BooksRepository } from '../infrastructure/BooksRepository';
import { StoreBooksRepository } from '../store/StoreBooksRepository';

const providers: Array<Provider> = [
	{
		provide: BooksRepository,
		useClass: StoreBooksRepository
	}
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('library', {
			books: booksReducer
		}),
		EffectsModule.forFeature([
			BooksEffects
		])
	],
	declarations: [
		BooksComponent
	],
	exports: []
})
export class BooksModule {


	static forRoot(config?: any): ModuleWithProviders {

		let rootProviders = [...providers];

		if (config.rest === true) {
			rootProviders = [
				...rootProviders,
				{
					provide: BooksResource,
					useClass: RestBooksResource
				} as Provider];
		}

		return {
			ngModule: BooksModule,
			providers: rootProviders
		};
	}

}
