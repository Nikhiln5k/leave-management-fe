import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  // const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);

  const isLoggedIn = !!storageService.getToken()
  if (!isLoggedIn) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};