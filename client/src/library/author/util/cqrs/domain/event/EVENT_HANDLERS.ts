import { InjectionToken } from '@angular/core';

import { EventHandler } from './EventHandler';

export const EVENT_HANDLERS = new InjectionToken<Array<EventHandler>>('EVENT_HANDLERS');
