import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

import { Command } from './Command';

export const COMMAND_STREAM = new InjectionToken<Subject<Command>>('COMMAND_STREAM');
