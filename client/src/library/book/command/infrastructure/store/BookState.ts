import { AnemicBook } from './AnemicBook';

import { State } from '../../../../../util/store/State';

export class BookState extends State {

	entities: {[key: number]: AnemicBook} = {};

}
