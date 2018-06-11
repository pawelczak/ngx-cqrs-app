import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

import { AddBookToFavouritesCommand, ReadFavouriteBookIdsCommand, ReadFavouriteBookIdsSuccessCommand } from './FavouriteCommands';
import { Commands } from '../../../../../util/cqrs/command/domain/Commands';
import { FavouriteBookDispatcher } from './FavouriteBookDispatcher';
import { FavouriteBookResource } from './FavouriteBookResource';

@Injectable()
export class ReadFavouriteBookIdsHandler {

	constructor(private commands: Commands,
				private favouriteBookDispatcher: FavouriteBookDispatcher,
				private favouriteBookResource: FavouriteBookResource) {
		this.execute();
	}

	execute(): void {
		this.commands
			.pipe(
				filter((c: any) => c.type === (ReadFavouriteBookIdsCommand.type))
			)
			.subscribe((c) => {

				const fbics = this.favouriteBookResource.getFavouriteBookIds();

				this.favouriteBookDispatcher.dispatch(new ReadFavouriteBookIdsSuccessCommand(fbics));
			});
	}
}
