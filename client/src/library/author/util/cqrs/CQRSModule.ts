import { Inject, NgModule } from '@angular/core';

import { CommandStream } from './domain/CommandStream';
import { FILTERED_COMMAND_STREAM } from './domain/FilteredCommandsStream';
import { CommandBus } from './domain/CommandBus';
import { CommandDispatcher } from './domain/CommandDispatcher';
import { COMMAND_HANDLERS } from './domain/COMMAND_HANDLERS';
import { LogCommandHandler } from './domain/LogCommandHandler';
import { CommandHandler } from './domain/CommandHandler';
import { Command } from './domain/Command';

const handlers = [
	{
		provide: COMMAND_HANDLERS,
		useClass: LogCommandHandler,
		multi: true
	}
];


@NgModule({
	imports: [],
	providers: [
		{ provide: FILTERED_COMMAND_STREAM, useExisting: CommandStream },
		CommandBus,
		CommandStream,
		CommandDispatcher,
		...handlers
	]
})
export class CQRSModule {

	constructor(@Inject(COMMAND_HANDLERS) private handlers: Array<CommandHandler>,
				private commandBus: CommandBus) {
		this.commandBus
			.subscribe((command: Command) => {

					this.handlers
						.forEach((handler: CommandHandler) => {
							handler.execute(command);
						});
				});
	}
}
