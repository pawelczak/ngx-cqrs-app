import { AbstractEvent } from '../../../util/AbstractEvent';

export class AuthorsLoadedEvent extends AbstractEvent {

	constructor(public data: any) {
		super();
	}

}
