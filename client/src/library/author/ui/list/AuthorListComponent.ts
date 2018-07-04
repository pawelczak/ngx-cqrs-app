import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, skipUntil, switchMap, take, takeUntil } from 'rxjs/operators';

import { LoadAuthorsCommand } from '../../command/domain/AuthorCommands';
import { AuthorQueryRepository } from '../../query/domain/AuthorQueryRepository';
import { AuthorQuery } from '../../query/domain/AuthorQuery';

import { CommandDispatcher } from '../../util/cqrs/domain/command/CommandDispatcher';
import { FetchArticlesCommand } from '../../../article/domain/command/fetch/FetchArticlesCommand';
import { EventBus } from '../../util/cqrs/domain/event/EventBus';
import { DomainEvent } from '../../util/cqrs/domain/event/DomainEvent';
import { ArticlesFetchedEvent } from '../../../article/domain/command/fetch/ArticlesFetchedEvent';
import { AuthorsLoadedEvent } from '../../command/domain/AuthorEvents';

@Component({
	selector: 'cqrs-author-list',
	templateUrl: './AuthorListComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorListComponent implements OnInit {

	authors: Array<AuthorQuery>;

	private unsubscribe$ = new Subject<void>();

	constructor(private injector: Injector,
				private changeDetectorRef: ChangeDetectorRef,
				private commandDispatcher: CommandDispatcher,
				private authorQueryRepository: AuthorQueryRepository,
				private eventBus: EventBus) {
	}

	ngOnInit() {

		this.eventBus
			.pipe(
				filter((event: DomainEvent) => event.constructor.name === AuthorsLoadedEvent.type),
				switchMap(() => {
					return this.authorQueryRepository
							   .selectAll()
							   .pipe(
								   takeUntil(
									   this.unsubscribe$
								   )
							   );
				})
			)
			.subscribe((authors) => {
				this.authors = authors;
				this.changeDetectorRef.detectChanges();
			});

		this.eventBus
			.pipe(
				filter((event: DomainEvent) => event.constructor.name === ArticlesFetchedEvent.type),
				take(1)
			)
			.subscribe(() => {
				this.commandDispatcher.dispatch(new LoadAuthorsCommand());
			});

		this.commandDispatcher.dispatch(new FetchArticlesCommand());

	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}
