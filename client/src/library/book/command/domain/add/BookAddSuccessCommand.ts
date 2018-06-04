import { Command } from '../../../../../util/cqrs/Command';
import { AnemicBook } from '../AnemicBook';

export class BookAddSuccessCommand implements Command {

	constructor(public anemicBook: AnemicBook) {}

}
