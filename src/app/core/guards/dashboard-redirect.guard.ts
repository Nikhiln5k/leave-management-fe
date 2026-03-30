import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

export const dashboardRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.user();

  if (!user) {
    return router.createUrlTree(['/auth']);
  }

  return user.role === 'ADMIN'
    ? router.createUrlTree(['/dashboard/admin'])
    : router.createUrlTree(['/dashboard/employee']);
};
