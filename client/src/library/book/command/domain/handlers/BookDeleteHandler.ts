import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BookResource } from '../BookResource';

@Injectable()
export class BookDeleteHandler {

	constructor(private bookResource: BookResource) {
	}

	handleDeleteCommand(title: string): Observable<boolean> {
		return this.bookResource.deleteBook(title);
	}
}
