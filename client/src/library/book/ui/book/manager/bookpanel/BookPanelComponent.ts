import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Book } from '../../../../query/domain/Book';

@Component({
	selector: 'cqrs-book-panel',
	templateUrl: './BookPanelComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookPanelComponent implements OnInit {

	@Input()
	book: Book;

	constructor() {

	}

	ngOnInit() {

	}


}
