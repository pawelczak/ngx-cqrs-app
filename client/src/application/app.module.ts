import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

import { BookManagerModule } from '../library/book/ui/book/manager/BookManagerModule';

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		BookManagerModule.forRoot({ rest: true })


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

