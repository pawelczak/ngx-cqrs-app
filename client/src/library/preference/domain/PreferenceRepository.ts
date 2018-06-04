import { Preference } from './Preference';

export abstract class PreferenceRepository {

	abstract getPreference(title: string): Preference;

}
