import { Injectable } from '@angular/core';

import { CommandHandler } from './CommandHandler';
import { Command } from './Command';

@Injectable()
export class LogCommandHandler extends CommandHandler {

	execute(command: Command): void {
		console.log(command);
	}

}
