import { State } from '../../../../../util/store/State';
import { AnemicBook } from './AnemicBook';

export class BookState extends State {

	entities: {[key: number]: AnemicBook} = {};

}
