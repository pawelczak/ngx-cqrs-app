import { Command } from '../../../../../util/cqrs/Command';
import { BookAggregate } from '../BookAggregate';

export class BookAddSuccessCommand implements Command {

	constructor(public bookAggregate: BookAggregate) {}

}
