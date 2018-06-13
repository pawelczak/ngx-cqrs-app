import { getUuidV4String } from '../../../uuid';

export abstract class Command {

	private readonly commandId: string = getUuidV4String();

	static get type(): string {
		return this.prototype.constructor.name;
	}

	ofType(type: string): boolean {
		return this.constructor.name === type;
	}

	getPayload(): any {}
}
