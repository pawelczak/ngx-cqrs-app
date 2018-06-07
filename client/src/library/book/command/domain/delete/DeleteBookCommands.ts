import { Command } from '../../../../../util/cqrs/Command';

export class DeleteBookCommand extends Command {

	constructor(public title: string) {
		super();
	}
}

export class DeleteBookSuccessCommand extends Command {

	constructor(public title: string) {
		super();
	}
}

export class DeleteBookFailureCommand extends Command {

	constructor(public title: string) {
		super();
	}
}