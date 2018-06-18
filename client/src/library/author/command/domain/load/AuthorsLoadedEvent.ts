import { AbstractEvent } from '../../../util/cqrs/domain/AbstractEvent';

export class AuthorsLoadedEvent extends AbstractEvent {

	constructor(public data: any) {
		super();
	}

}
