import { Command } from '../../../../../util/cqrs/Command';

export class BookDeleteCommand implements Command {

	constructor(public title: string) {}
}
