import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef } from '@angular/core';

import { LoadAuthorsCommand } from '../../command/domain/AuthorCommands';
import { AuthorQueryRepository } from '../../query/domain/AuthorQueryRepository';
import { AuthorQuery } from '../../query/domain/AuthorQuery';

import { CommandDispatcher } from '../../util/cqrs/domain/command/CommandDispatcher';

@Component({
	selector: 'sp-author-list',
	templateUrl: './AuthorListComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorListComponent implements OnInit {

	authors: Array<AuthorQuery>;

	constructor(private injector: Injector,
				private changeDetectorRef: ChangeDetectorRef,
				private commandDispatcher: CommandDispatcher,
				private authorRepository: AuthorQueryRepository) {

		console.log((Injector.create({ providers: [], parent: this.injector })).toString());
	}

	ngOnInit() {

		this.authorRepository
			.selectAll()
			.subscribe((authors) => {
				this.authors = authors;
				this.changeDetectorRef.detectChanges();
			});

		this.commandDispatcher.dispatch(new LoadAuthorsCommand());
	}

}