import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventStream extends Subject<any> {

	next(value: any): void {
		super.next(value);
	}

}
