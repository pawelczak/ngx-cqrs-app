import { Command } from './Command';

export abstract class CommandHandler {

	constructor(private commandType: string) {}

	abstract execute(command: Command): void;

	forCommand(command: Command): boolean {
		return this.commandType === command.constructor.name || this.commandType === Command.type;
	}
}