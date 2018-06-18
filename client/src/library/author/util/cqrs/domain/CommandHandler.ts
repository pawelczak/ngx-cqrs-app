import { Command } from './Command';

export abstract class CommandHandler {

	abstract execute(command: Command): void;
}