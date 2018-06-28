import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { EventHandler } from '../../../domain/event/EventHandler';
import { DomainEvent } from '../../../domain/event/DomainEvent';

@Injectable()
export class NgrxEventHandler extends EventHandler {

	constructor(private store: Store<any>) {
		super();
	}

	execute(event: DomainEvent): void {
		this.store.dispatch({
			type: event.constructor.name,
			payload: JSON.parse(JSON.stringify(event))
		});
	}

}
