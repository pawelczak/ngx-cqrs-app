import { State } from '../../../../../util/store/State';
import { AnemicBook } from '../../domain/AnemicBook';

export class BookState extends State {

	books: Array<AnemicBook> = [];

}
