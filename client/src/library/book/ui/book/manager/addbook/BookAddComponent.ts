import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookCommandDispatcher } from '../../../../command/domain/BookCommandDispatcher';
import { AddBookCommand } from '../../../../command/domain/add/AddBookCommands';

@Component({
	selector: 'cqrs-add-book',
	template: `

		<form [formGroup]="addBookForm">

			Title:
			<input formControlName="title">

			<button (click)="addBook()">Add Book</button>

		</form>
	`
})
export class BookAddComponent {

	addBookForm: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private bookCommandDispatcher: BookCommandDispatcher) {
		this.createForm();
	}

	addBook(): void {

		const bookTitle = this.addBookForm.value.title;

		this.bookCommandDispatcher.dispatch(new AddBookCommand(bookTitle));

		this.addBookForm.reset();
	}

	private createForm(): void {
		this.addBookForm =
			this.formBuilder.group({
				title: ['', Validators.required]
			});
	}

}
