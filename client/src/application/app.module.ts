import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { BooksModule } from '../library/books/app/BooksModule';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		BooksModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			maxAge: 10
		})
	],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}

