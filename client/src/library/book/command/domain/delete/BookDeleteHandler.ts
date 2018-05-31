import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BookResource } from '../BookResource';
import { BookDeleteCommand } from './BookDeleteCommand';

@Injectable()
export class BookDeleteHandler {

	constructor(private bookResource: BookResource) {
	}

	handleDeleteCommand(bookDeleteCommand: BookDeleteCommand): Observable<boolean> {

		const title = bookDeleteCommand.title;
		return this.bookResource.deleteBook(title);
	}
}
