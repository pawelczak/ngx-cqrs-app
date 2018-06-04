import { Command } from './Command';

export abstract class Dispatcher {
	abstract dispatch(command: Command): void;
}
