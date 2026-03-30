import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { JwtService } from '../services/jwt.service';

export const dashboardRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const jwtService = inject(JwtService);

  const user = jwtService.decode();

  if (!user) {
    return router.createUrlTree(['/auth']);
  }

  const target =
    user.role === 'ADMIN'
      ? '/dashboard/admin'
      : '/dashboard/employee';

  // prevent loop
  if (state.url === target) {
    return true;
  }

  return router.createUrlTree([target]);
};
