import { Command } from '../../../../../util/cqrs/command/domain/Command';
import { CommandDispatcher } from '../../../../../util/cqrs/command/domain/CommandDispatcher';

export abstract class FavouriteBookDispatcher extends CommandDispatcher {

	abstract dispatch(command: Command): void;
}
