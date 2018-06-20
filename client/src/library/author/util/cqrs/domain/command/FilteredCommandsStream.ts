import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

import { Command } from './Command';

export const FILTERED_COMMAND_STREAM = new InjectionToken<Subject<Command>>('FILTERED_COMMAND_STREAM');
