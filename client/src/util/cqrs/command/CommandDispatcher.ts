import { Command } from './Command';

export abstract class CommandDispatcher {
	abstract dispatch(command: Command): void;
}
