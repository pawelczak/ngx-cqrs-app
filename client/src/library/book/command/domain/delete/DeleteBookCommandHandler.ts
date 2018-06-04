import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BookResource } from '../BookResource';
import { DeleteBookCommand } from './DeleteBookCommands';

@Injectable()
export class DeleteBookCommandHandler {

	constructor(private bookResource: BookResource) {
	}

	execute(deleteBookCommand: DeleteBookCommand): Observable<boolean> {

		const title = deleteBookCommand.title;
		return this.bookResource.deleteBook(title);
	}
}
