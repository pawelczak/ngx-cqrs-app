import { Command } from '../../../../../util/cqrs/Command';

import { BookAggregate } from '../BookAggregate';


export class AddBookCommand extends Command {

	constructor(public title: string) {
		super();
	}
}

export class AddBookSuccessCommand extends Command {

	constructor(public bookAggregate: BookAggregate) {
		super();
	}
}

export class AddBookFailureCommand extends Command {

	constructor(public error: string) {
		super();
	}
}
