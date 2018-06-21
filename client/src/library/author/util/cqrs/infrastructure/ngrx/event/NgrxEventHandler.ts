import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { EventHandler } from '../../../domain/event/EventHandler';
import { AbstractEvent } from '../../../domain/event/AbstractEvent';

@Injectable()
export class NgrxEventHandler extends EventHandler {

	constructor(private store: Store<any>) {
		super();
	}

	execute(event: AbstractEvent): void {
		this.store.dispatch({
			type: event.constructor.name,
			payload: event.data
		});
	}

}
