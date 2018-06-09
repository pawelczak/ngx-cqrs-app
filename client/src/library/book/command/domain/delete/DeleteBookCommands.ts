import { Command } from '../../../../../util/cqrs/Command';

export class DeleteBookCommand extends Command {

	constructor(public id: number) {
		super();
	}
}

export class DeleteBookSuccessCommand extends Command {

	constructor(public id: number) {
		super();
	}
}

export class DeleteBookFailureCommand extends Command {

	constructor(public error: string) {
		super();
	}
}