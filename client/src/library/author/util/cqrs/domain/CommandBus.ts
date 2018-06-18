import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Operator } from 'rxjs';

import { Command } from './Command';
import { FILTERED_COMMAND_STREAM } from './FilteredCommandsStream';

@Injectable()
export class CommandBus<C = Command> extends Observable<C> {

	constructor(@Inject(FILTERED_COMMAND_STREAM) commandsStream?: Subject<Command>) {
		super();

		if (commandsStream) {
			this.source = commandsStream;
		}
	}

	lift<R>(operator: Operator<C, R>): Observable<R> {
		const observable = new CommandBus<R>();
		observable.source = this;
		observable.operator = operator;
		return observable;
	}

}
