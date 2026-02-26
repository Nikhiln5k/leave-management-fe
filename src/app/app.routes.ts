import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
    import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      { path: '', redirectTo: 'leave', pathMatch: 'full' },
      {
        path: 'leave',
        loadComponent: () =>
          import('./features/leave/leave.component').then(
            (m) => m.LeaveComponent,
          ),
          canActivate: [authGuard]
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.component').then((m) => m.AuthComponent),
  },
];
