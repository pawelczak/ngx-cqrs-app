import { Inject, NgModule } from '@angular/core';
import { EVENT_HANDLERS } from './domain/event/EVENT_HANDLERS';
import { CommandBus } from './domain/command/CommandBus';
import { Command } from './domain/command/Command';
import { CommandHandler } from './domain/command/CommandHandler';
import { EventHandler } from './domain/event/EventHandler';
import { EventBus } from './domain/event/EventBus';
import { COMMAND_HANDLERS } from './domain/command/COMMAND_HANDLERS';

@NgModule({
	imports: []
})
export class CqrsForRootModule {

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
}
