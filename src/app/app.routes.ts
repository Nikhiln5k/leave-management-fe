import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { dashboardRedirectGuard } from './core/guards/dashboard-redirect.guard';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dash_routes),
        canActivate: [authGuard, dashboardRedirectGuard],
      },
      {
        path: 'leaves',
        loadChildren: () => import('./features/leaves/leaves.routes').then(m => m.leave_routes),
        canActivate: [authGuard],
      }
    ]

  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.component').then((m) => m.AuthComponent),
  },
]