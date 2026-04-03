import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export const dashboardRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService = inject(JwtService);

  const user = jwtService.decode();
  
  if (!user) {
    return router.navigate(['/auth']);
  }
  if (state.url === '/dashboard') {
    const target =
      user.role === 'ADMIN' ? '/dashboard/adminDash' : '/dashboard/empDash';

    return router.navigate([target]);
  }
  return true;
};
