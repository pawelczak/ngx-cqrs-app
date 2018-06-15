import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Operator } from 'rxjs';

import { Command } from './Command';
import { COMMAND_STREAM } from './CommandStream';


@Injectable()
export class Commands<C = Command> extends Observable<C> {

	constructor(@Inject(COMMAND_STREAM) commandsStream?: Subject<Command>) {
		super();

		if (commandsStream) {
			this.source = commandsStream;
		}
	}

	lift<R>(operator: Operator<C, R>): Observable<R> {
		const observable = new Commands<R>();
		observable.source = this;
		observable.operator = operator;
		return observable;
	}

}
