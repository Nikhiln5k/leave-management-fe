import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { dashboardRedirectGuard } from './core/guards/dashboard-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [authGuard, dashboardRedirectGuard],
        children: [
          {
            path: 'admin',
            loadComponent: () =>
              import(
                './features/admin-dashboard/admin-dashboard.component'
              ).then((c) => c.AdminDashboardComponent),
            canActivate: [roleGuard(['ADMIN'])],
          },
          {
            path: 'employee',
            loadComponent: () =>
              import(
                './features/employee-dashboard/employee-dashboard.component'
              ).then((c) => c.EmployeeDashboardComponent),
            canActivate: [roleGuard(['EMPLOYEE'])],
          },
        ],
      },
      {
        path: 'leave',
        loadComponent: () =>
          import('./features/leave/leave.component').then(
            (c) => c.LeaveComponent,
          ),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [authGuard]
  },
];
