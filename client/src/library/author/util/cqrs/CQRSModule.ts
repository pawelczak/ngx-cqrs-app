import { Inject, ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { CommandStream } from './domain/command/CommandStream';
import { FILTERED_COMMAND_STREAM } from './domain/command/FilteredCommandsStream';
import { CommandBus } from './domain/command/CommandBus';
import { CommandDispatcher } from './domain/command/CommandDispatcher';
import { COMMAND_HANDLERS } from './domain/command/COMMAND_HANDLERS';
import { LogCommandHandler } from './domain/command/LogCommandHandler';
import { CommandHandler } from './domain/command/CommandHandler';
import { Command } from './domain/command/Command';
import { NgrxLoggerCommandHandler } from './infrastructure/ngrx/command/NgrxLoggerCommandHandler';
import { CqrsStrategy } from './CqrsStrategy';
import { EventBus } from './domain/event/EventBus';
import { EventDispatcher } from './domain/event/EventDispatcher';
import { EventStream } from './domain/event/EventStream';
import { EVENT_HANDLERS } from './domain/event/EVENT_HANDLERS';
import { NgrxEventHandler } from './infrastructure/ngrx/event/NgrxEventHandler';
import { EventHandler } from './domain/event/EventHandler';

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
	EventBus,
	EventStream,
	EventDispatcher,
	...handlers
];

const ngrxProviders: Array<Provider> = [
	{
		provide: COMMAND_HANDLERS,
		useClass: NgrxLoggerCommandHandler,
		multi: true
	}, {
		provide: EVENT_HANDLERS,
		useClass: NgrxEventHandler,
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

	constructor(@Inject(COMMAND_HANDLERS) private commandHandlers: Array<CommandHandler>,
				@Inject(EVENT_HANDLERS) private eventHandlers: Array<EventHandler>,
				private commandBus: CommandBus,
				private eventBus: EventBus) {

		this.commandBus
			.subscribe((command: Command) => {

					this.commandHandlers
						.forEach((handler: CommandHandler) => {
							if (handler.forCommand(command)) {
								handler.execute(command);
							}
						});
				});

		this.eventBus
			.subscribe((command: Command) => {

				this.eventHandlers
					.forEach((handler: EventHandler) => {
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
