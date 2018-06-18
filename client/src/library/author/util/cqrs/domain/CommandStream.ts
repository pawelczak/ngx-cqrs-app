import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CommandStream extends Subject<any> {

	next(value: any): void {
		super.next(value);
	}

}
