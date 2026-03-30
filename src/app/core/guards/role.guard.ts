import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const jwtService = inject(JwtService);
    const user = jwtService.decode();

    if (!user || !allowedRoles.includes(user.role)) {
      return false;
    }

    return true;
  };
};