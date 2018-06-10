import { Command } from '../../../../util/cqrs/command/Command';
import { CommandDispatcher } from '../../../../util/cqrs/command/CommandDispatcher';

export abstract class BookCommandDispatcher extends CommandDispatcher {

	abstract dispatch(command: Command): void;
}
