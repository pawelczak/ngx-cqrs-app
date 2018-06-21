import { Injectable } from '@angular/core';

import { EventStream } from './EventStream';

@Injectable()
export class EventDispatcher {

	constructor(private eventStream: EventStream) {}

	dispatch(value: any): void {
		this.eventStream.next(value);
	}
}
