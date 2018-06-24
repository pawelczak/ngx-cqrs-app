import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CommandHandler } from '../../../domain/command/CommandHandler';
import { Command } from '../../../domain/command/Command';

@Injectable()
export class NgrxLoggerCommandHandler extends CommandHandler {

	constructor(private store: Store<any>) {
		super(Command.type);
	}

	execute(command: Command): void {
		this.store.dispatch({
			type: command.constructor.name,
			payload: JSON.parse(JSON.stringify(command))
		});
	}

}
