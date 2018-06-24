import { Command } from '../../util/cqrs/domain/command/Command';

export class LoadAuthorsCommand extends Command {

	constructor() {
		super();
	}

}

export class IncAuthorRatingCommand extends Command {

	constructor(public aggregateId: string) {
		super();
	}

}