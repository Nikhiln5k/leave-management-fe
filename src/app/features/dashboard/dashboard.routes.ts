import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";

export const dash_routes: Routes = [
 {
    path: '', redirectTo: 'adminDash', pathMatch: 'full'
 },
 {
    path: 'adminDash',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent),
    canActivate: [roleGuard(['ADMIN'])],
 },
 {
    path: 'empDash',
    loadComponent: () => import('./employee-dashboard/employee-dashboard.component').then(c => c.EmployeeDashboardComponent),
    canActivate: [roleGuard(['EMPLOYEE'])],
 }
];