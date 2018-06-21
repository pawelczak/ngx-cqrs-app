import { AbstractEvent } from './AbstractEvent';

export abstract class EventHandler {

	abstract execute(event: AbstractEvent): void;
}
