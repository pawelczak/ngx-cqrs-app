import { DomainEvent } from './DomainEvent';

export abstract class EventHandler {

	abstract execute(event: DomainEvent): void;
}
