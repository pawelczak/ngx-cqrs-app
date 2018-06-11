import { Command } from '../../../../../util/cqrs/command/domain/Command';

import { BookAggregate } from '../BookAggregate';


export class FetchAllBooksCommand extends Command {
	constructor() {
		super();
	}
}

export class FetchAllBooksSuccessCommand extends Command {

	constructor(public bookAggregates: Array<BookAggregate>) {
		super();
	}
}

export class FetchAllBooksFailureCommand extends Command {

	constructor(public error: string) {
		super();
	}
}
