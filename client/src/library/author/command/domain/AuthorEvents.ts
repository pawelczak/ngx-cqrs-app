import { AbstractEvent } from '../../util/cqrs/domain/event/AbstractEvent';

export class AuthorsLoadedEvent extends AbstractEvent {
	constructor(public data: any){
		super();
	}
}

export class AuthorChangedEvent extends AbstractEvent {
	constructor(public data: any) {
		super();
	}
}

export class IncAuthorRatingEvent extends AbstractEvent {
	constructor(public aggregateId: any) {
		super();
	}
}