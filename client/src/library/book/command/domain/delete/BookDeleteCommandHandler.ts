import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BookResource } from '../BookResource';
import { BookDeleteCommand } from './BookDeleteCommand';

@Injectable()
export class BookDeleteCommandHandler {

	constructor(private bookResource: BookResource) {
	}

	execute(bookDeleteCommand: BookDeleteCommand): Observable<boolean> {

		const title = bookDeleteCommand.title;
		return this.bookResource.deleteBook(title);
	}
}
