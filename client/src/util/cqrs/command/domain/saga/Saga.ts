import { Command } from '../Command';
import { Injectable } from '@angular/core';
import { Commands } from '../Commands';
import { RequestedCommand } from './RequestedCommand';

@Injectable()
export class Saga {

	private commands: Array<RequestedCommand>;

	constructor(private conmmandStream: Commands) {}


	init() {

		// this.commands
		// 	.forEach(() => {
		//
		// 		this.conmmandStream
		// 			.filter(() => {});
		//
		// 	})
		//
		// this.conmmandStream

	}

	setCommands(arr: any): void {

		const reqId = 'asd';

		this.commands = arr.map((c: Command) => RequestedCommand.fromCommand(c, reqId));
	}

}