import { InjectionToken } from '@angular/core';

import { CommandHandler } from './CommandHandler';

export const COMMAND_HANDLERS = new InjectionToken<Array<CommandHandler>>('COMMAND_HANDLERS');
