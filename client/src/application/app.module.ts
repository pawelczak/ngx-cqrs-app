import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

// import { BookManagerModule } from '../library/book/ui/book/manager/BookManagerModule';
import { AuthorModule } from '../library/author/ui/list/AuthorModule';

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		// BookManagerModule.forRoot({ rest: true }),
		AuthorModule.forRoot(),
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

