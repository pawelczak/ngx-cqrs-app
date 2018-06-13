import { Injectable } from '@angular/core';
import { filter, tap } from 'rxjs/operators';

import { RemoveBookFromFavouritesCommand } from './FavouriteCommands';
import { FavouriteBookResource } from './FavouriteBookResource';

import { Commands } from '../../../../../util/cqrs/command/domain/Commands';
import { Command } from '../../../../../util/cqrs/command/domain/Command';

@Injectable()
export class RemoveBookFromFavouritesHandler {

	constructor(private commands: Commands,
				private favouriteBookResource: FavouriteBookResource) {
		this.execute();
	}

	execute(): void {
		this.commands
			.pipe(
				filter((command: any) => command.type === (RemoveBookFromFavouritesCommand.type))
			)
			.subscribe((command: any) => {
				this.favouriteBookResource.removeFavouriteBook(command.payload.payload);
			});
	}
}
