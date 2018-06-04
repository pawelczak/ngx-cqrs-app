import { Injectable } from '@angular/core';

import { PreferenceRepository } from '../domain/PreferenceRepository';
import { Preference } from '../domain/Preference';

@Injectable()
export class PersistedPreferenceRepository extends PreferenceRepository {

	getPreference(title: string): Preference {

		return new Preference();

	}

}
