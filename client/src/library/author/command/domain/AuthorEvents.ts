import { AbstractEvent } from '../../util/cqrs/domain/event/AbstractEvent';

export class AuthorsLoadedEvent extends AbstractEvent {
	constructor(public data: any){
		super();
	}
}
