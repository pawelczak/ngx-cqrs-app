import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BooksComponent } from '../ui/books/BooksComponent';
import { booksReducer } from '../store/books/BooksReducer';
import { BooksEffects } from '../store/books/BooksEffects';


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
}
