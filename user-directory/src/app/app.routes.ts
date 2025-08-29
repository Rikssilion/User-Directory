import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },

  {
    path: 'users/:id',
    loadComponent: () =>
      import('./components/user-details/user-details.component').then(
        m => m.UserDetailsComponent
      )
  },

  { path: 'add-user', component: UserFormComponent },
  { path: '**', redirectTo: 'users' }
];
