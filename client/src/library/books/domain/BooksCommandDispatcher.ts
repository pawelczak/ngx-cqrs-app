import { Injectable } from '@angular/core';

import { BooksModule } from '../app/BooksModule';

@Injectable({
	providedIn: BooksModule
})
export class BooksCommandDispatcher {

	constructor() {
	}

	fetchBooks(): void {

	}

}
