import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const user = authService.user();

    if (!user || !allowedRoles.includes(user.role)) {
      return false;
    }

    return true;
  };
};