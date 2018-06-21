import { Injectable } from '@angular/core';
import { Observable, Operator } from 'rxjs';

import { AbstractEvent } from './AbstractEvent';
import { EventStream } from './EventStream';

@Injectable()
export class EventBus<C = AbstractEvent> extends Observable<C> {

	constructor(eventStream?: EventStream) {
		super();

		if (eventStream) {
			this.source = eventStream;
		}
	}

	lift<R>(operator: Operator<C, R>): Observable<R> {
		const observable = new EventBus<R>();
		observable.source = this;
		observable.operator = operator;
		return observable;
	}

}
