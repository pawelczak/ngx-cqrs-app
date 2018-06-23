import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { AuthorQuery } from './AuthorQuery';

import { EventBus } from '../../util/cqrs/domain/event/EventBus';
import { AbstractEvent } from '../../util/cqrs/domain/event/AbstractEvent';
import { AuthorsLoadedEvent } from '../../command/domain/AuthorEvents';

export abstract class AuthorQueryRepository {

	constructor(protected eventBus: EventBus) {
	}

	selectAll(): Observable<Array<AuthorQuery>> {

		return this.eventBus
				   .pipe(
					   filter((event: AbstractEvent) => event.constructor.name === AuthorsLoadedEvent.type),
					   switchMap(() => this.selectAuthorsFromState())
				   );
	}

	abstract selectOne(): Observable<AuthorQuery>;

	abstract selectAuthorsFromState(): Observable<Array<AuthorQuery>>;
}
