import { Command } from '../../../../../util/cqrs/Command';

import { BookAggregate } from '../BookAggregate';


export class AddBookCommand implements Command {

	constructor(public title: string) {}
}

export class AddBookSuccessCommand implements Command {

	constructor(public bookAggregate: BookAggregate) {}
}

export class AddBookFailureCommand implements Command {

	constructor(public error: string) {}
}
