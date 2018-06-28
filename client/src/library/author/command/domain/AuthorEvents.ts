import { DomainEvent } from '../../util/cqrs/domain/event/DomainEvent';

export class AuthorsLoadedEvent extends DomainEvent {
	constructor(public data: any){
		super();
	}
}

export class AuthorChangedEvent extends DomainEvent {
	constructor(public data: any) {
		super();
	}
}

export class IncAuthorRatingEvent extends DomainEvent {
	constructor(public aggregateId: any) {
		super();
	}
}