import { Injectable } from '@angular/core';

import { CommandStream } from './CommandStream';

@Injectable()
export class CommandDispatcher {

	constructor(private commandStream: CommandStream) {}

	dispatch(value: any): void {
		this.commandStream.next(value);
	}
}
