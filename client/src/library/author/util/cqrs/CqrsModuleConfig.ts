export interface CqrsModuleConfig {

	storeName: string;

	states: {[key: string]: any};
}
