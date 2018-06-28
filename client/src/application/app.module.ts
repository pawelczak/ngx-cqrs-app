import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

// import { BookManagerModule } from '../library/book/ui/book/manager/BookManagerModule';
import { AuthorModule } from '../library/author/app/AuthorModule';
import { CQRSModule } from '../library/author/util/cqrs/CQRSModule';
import { CqrsStrategy } from '../library/author/util/cqrs/CqrsStrategy';

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		// BookManagerModule.forRoot({ rest: true })

		CQRSModule.forRoot(CqrsStrategy.NGRX),

		AuthorModule.forRoot()
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

