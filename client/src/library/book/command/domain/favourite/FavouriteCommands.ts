import { Command } from '../../../../../util/cqrs/command/domain/Command';

export class ReadFavouriteBookIdsCommand extends Command {
	constructor() {
		super();
	}
}

export class ReadFavouriteBookIdsSuccessCommand extends Command {
	constructor(public payload: any) {
		super();
	}
}

export class ReadFavouriteBookIdsFailureCommand extends Command {
	constructor() {
		super();
	}
}

export class AddBookToFavouritesCommand extends Command {
	constructor(public bookId: number) {
		super();
	}
}

export class RemoveBookFromFavouritesCommand extends Command {
	constructor(public bookId: number) {
		super();
	}
}
