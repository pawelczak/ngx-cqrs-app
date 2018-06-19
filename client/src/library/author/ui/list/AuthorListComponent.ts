import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';

import { LoadAuthorsCommand } from '../../command/domain/AuthorCommands';
import { AuthorRepository } from '../../query/domain/AuthorRepository';
import { Author } from '../../query/domain/Author';

import { CommandDispatcher } from '../../util/cqrs/domain/CommandDispatcher';
import { CommandStream } from '../../util/cqrs/domain/CommandStream';

@Component({
	selector: 'sp-author-list',
	templateUrl: './AuthorListComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorListComponent implements OnInit {

	authors: Array<Author>;

	constructor(private injector: Injector,
				private commandDispatcher: CommandDispatcher,
				private commandStream: CommandStream,
				private authorRepository: AuthorRepository) {

		console.log((Injector.create({ providers: [], parent: this.injector })).toString());
	}

	ngOnInit() {

		this.authorRepository
			.selectAll()
			.subscribe((authors) => {
				this.authors = authors;
			});

		this.commandDispatcher.dispatch(new LoadAuthorsCommand());
	}

}