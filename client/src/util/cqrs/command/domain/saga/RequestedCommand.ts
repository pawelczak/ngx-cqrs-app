import { Command } from '../Command';

export class RequestedCommand extends Command {

	constructor(public requesterId: string) {
		super();
	}

	static fromCommand(command: Command, requesterId: string): RequestedCommand {
		return Object.assign(new RequestedCommand(requesterId), command);
	}
}
