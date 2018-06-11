import { ModuleWithProviders, NgModule } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { Commands } from '../command/domain/Commands';
import { COMMAND_STREAM } from '../command/domain/CommandStream';

const providers = [
	Commands,
	{
		provide: COMMAND_STREAM,
		useExisting: Actions
	}
];

@NgModule({
	imports: []
})
export class CqrsModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CqrsModule,
			providers: providers
		};
	}
}