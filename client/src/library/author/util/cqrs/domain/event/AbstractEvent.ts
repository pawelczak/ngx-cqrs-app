import { Streamable } from '../Streamable';

export abstract class AbstractEvent extends Streamable {
	constructor(public data?: any) {
		super();
	}
}
