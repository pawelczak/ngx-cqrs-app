import { LoadAuthorCommandHandler } from './LoadAuthorCommandHandler';
import { IncAuthorRatingCommandHandler } from './IncAuthorRatingCommandHandler';
import { COMMAND_HANDLERS } from '../../../util/cqrs/domain/command/COMMAND_HANDLERS';

export const commandHandlerProviders = [
	{
		provide: COMMAND_HANDLERS,
		useClass: LoadAuthorCommandHandler,
		multi: true
	}, {
		provide: COMMAND_HANDLERS,
		useClass: IncAuthorRatingCommandHandler,
		multi: true
	}
];
