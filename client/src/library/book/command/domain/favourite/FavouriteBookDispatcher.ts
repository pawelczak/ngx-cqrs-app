import { Command } from '../../../../../util/cqrs/command/domain/Command';

export abstract class FavouriteBookDispatcher {

	abstract dispatch(command: Command): void;
}
