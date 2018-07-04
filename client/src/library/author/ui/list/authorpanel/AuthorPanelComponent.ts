import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { AuthorQuery } from '../../../query/domain/AuthorQuery';
import { IncAuthorRatingCommand } from '../../../command/domain/AuthorCommands';
import { CommandDispatcher } from '../../../util/cqrs/domain/command/CommandDispatcher';

@Component({
	selector: 'cqrs-author-panel',
	templateUrl: './AuthorPanelComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorPanelComponent {

	@Input()
	author: AuthorQuery;

	showMore: boolean = false;

	constructor(private commandDispatcher: CommandDispatcher) {
	}

	increaseAuthorsRating(authorId: string): void {
		this.commandDispatcher.dispatch(new IncAuthorRatingCommand(authorId));
	}

	showContributions(): void {
		this.showMore = true;
	}

	hideContributions(): void {
		this.showMore = false;
	}

}