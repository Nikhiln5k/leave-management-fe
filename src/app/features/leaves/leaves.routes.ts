import { Routes } from "@angular/router";

export const leave_routes: Routes = [
    {
        path: "", loadComponent: () => import('./leave-lists/leave-lists.component').then(c => c.LeaveListsComponent)
    }
];