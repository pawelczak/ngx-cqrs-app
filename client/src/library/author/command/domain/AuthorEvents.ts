import { AbstractEvent } from '../../util/cqrs/domain/event/AbstractEvent';

export class AuthorsLoadedEvent extends AbstractEvent {

	constructor(data: any) {
		super(data);
	}

}
