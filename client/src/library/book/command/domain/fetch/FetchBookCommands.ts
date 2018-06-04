import { Command } from '../../../../../util/cqrs/Command';

import { BookAggregate } from '../BookAggregate';


export class FetchAllBooksCommand implements Command {

	constructor() {}
}

export class FetchAllBooksSuccessCommand implements Command {

	constructor(public bookAggregates: Array<BookAggregate>) {}
}

export class FetchAllBooksFailureCommand implements Command {

	constructor(public error: string) {}
}
