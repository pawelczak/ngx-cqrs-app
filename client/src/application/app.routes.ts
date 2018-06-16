import { Routes } from '@angular/router';

import { BookManagerComponent } from '../library/book/ui/book/manager/BookManagerComponent';
import { AuthorListComponent } from '../library/author/ui/list/AuthorListComponent';


export const routes: Routes = [
  // { path: 'book', component: BookManagerComponent },
  { path: '', component: AuthorListComponent }
];
