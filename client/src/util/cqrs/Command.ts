export abstract class Command {
	static get type(): string {
		return this.prototype.constructor.name;
	}
}
