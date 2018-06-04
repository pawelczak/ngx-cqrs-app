import { Command } from '../../../../../util/cqrs/Command';

export class DeleteBookCommand implements Command {

	constructor(public title: string) {}
}

export class DeleteBookSuccessCommand implements Command {

	constructor(public title: string) {}
}

export class DeleteBookFailureCommand implements Command {

	constructor(public title: string) {}
}