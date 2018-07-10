import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { LoadAuthorsCommand } from '../../command/domain/AuthorCommands';
import { AuthorQueryRepository } from '../../query/domain/AuthorQueryRepository';
import { AuthorQuery } from '../../query/domain/AuthorQuery';

import { CommandDispatcher } from '../../util/cqrs/domain/command/CommandDispatcher';
import { FetchArticlesCommand } from '../../../article/domain/command/fetch/FetchArticlesCommand';
import { EventBus } from '../../util/cqrs/domain/event/EventBus';
import { DomainEvent } from '../../util/cqrs/domain/event/DomainEvent';
import { ArticlesFetchedEvent } from '../../../article/domain/command/fetch/ArticlesFetchedEvent';

@Component({
	selector: 'cqrs-author-list',
	templateUrl: './AuthorListComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorListComponent implements OnInit {

	authors: Array<AuthorQuery>;

	constructor(private injector: Injector,
				private changeDetectorRef: ChangeDetectorRef,
				private commandDispatcher: CommandDispatcher,
				private authorRepository: AuthorQueryRepository,
				private eventBus: EventBus) {
	}

	ngOnInit() {

		this.authorRepository
			.selectAll()
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

}
