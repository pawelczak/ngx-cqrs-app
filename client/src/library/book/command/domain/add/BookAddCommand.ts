import { Command } from '../../../../../util/cqrs/Command';

export class BookAddCommand implements Command {

	constructor(public title: string) {}
}
