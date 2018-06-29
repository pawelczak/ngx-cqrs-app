import { DomainEvent } from '../../../../author/util/cqrs/domain/event/DomainEvent';

export class ArticlesFetchedEvent extends DomainEvent {
	constructor(public data: any) {
		super();
	}
}
