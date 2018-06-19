import { Inject, ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { CommandStream } from './domain/CommandStream';
import { FILTERED_COMMAND_STREAM } from './domain/FilteredCommandsStream';
import { CommandBus } from './domain/CommandBus';
import { CommandDispatcher } from './domain/CommandDispatcher';
import { COMMAND_HANDLERS } from './domain/COMMAND_HANDLERS';
import { LogCommandHandler } from './domain/LogCommandHandler';
import { CommandHandler } from './domain/CommandHandler';
import { Command } from './domain/Command';
import { NgrxLoggerCommandHandler } from './infrastructure/ngrx/handlers/NgrxLoggerCommandHandler';
import { CqrsStrategy } from './CqrsStrategy';

const handlers = [
	{
		provide: COMMAND_HANDLERS,
		useClass: LogCommandHandler,
		multi: true
	}
];

const providers = [
	{ provide: FILTERED_COMMAND_STREAM, useExisting: CommandStream },
	CommandBus,
	CommandStream,
	CommandDispatcher,
	...handlers
];

const ngrxProviders: Array<Provider> = [
	{
		provide: COMMAND_HANDLERS,
		useClass: NgrxLoggerCommandHandler,
		multi: true
	}
];

const restProviders: Array<Provider> = [];

function populateProviders(strategies: CqrsStrategy = CqrsStrategy.NONE): Array<Provider> {

	let strategyProviders: Array<Provider> = [...providers];

	if (strategies & CqrsStrategy.NGRX) {
		strategyProviders = [...strategyProviders, ...ngrxProviders];
	}

	if (strategies & CqrsStrategy.REST) {
		strategyProviders = [...strategyProviders, ...restProviders];
	}

	return strategyProviders;
}


@NgModule({
	imports: []
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

	static forRoot(strategies: CqrsStrategy = CqrsStrategy.NONE): ModuleWithProviders {
		return {
			ngModule: CQRSModule,
			providers: populateProviders(strategies)
		};
	}
}
