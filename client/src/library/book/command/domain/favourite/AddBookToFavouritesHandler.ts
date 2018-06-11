import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

import { AddBookToFavouritesCommand } from './FavouriteCommands';

import { Commands } from '../../../../../util/cqrs/command/domain/Commands';
import { FavouriteBookResource } from './FavouriteBookResource';

@Injectable()
export class AddBookToFavouritesHandler {

	constructor(private commands: Commands,
				private favouriteBookResource: FavouriteBookResource) {
		this.execute();
	}

	execute(): void {
		this.commands
			.pipe(
				filter((command: any) => command.type === (AddBookToFavouritesCommand.type))
			)
			.subscribe((command) => {
				this.favouriteBookResource.addFavouriteBook(command.payload.bookId);
			});
	}
}
