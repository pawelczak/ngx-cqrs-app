import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CommandHandler } from '../../../domain/CommandHandler';
import { Command } from '../../../domain/Command';

@Injectable()
export class NgrxLoggerCommandHandler extends CommandHandler {

	constructor(private store: Store<any>) {
		super();}

	execute(command: Command): void {
		this.store.dispatch({
			type: command.constructor.name,
			payload: Object.assign({}, command)
		});
	}

}
