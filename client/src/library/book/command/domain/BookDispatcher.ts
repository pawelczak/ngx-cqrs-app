import { Command } from '../../../../util/cqrs/Command';

export abstract class BookDispatcher {

	abstract dispatch(command: Command): void;

}
