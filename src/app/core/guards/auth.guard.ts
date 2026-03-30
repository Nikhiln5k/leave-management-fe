import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const isLoggedIn = !!storageService.getToken()
  console.log('Auth Guard - Is Logged In:', isLoggedIn);
  if (!isLoggedIn) {
    router.navigate(['/auth']);
    return false;
  } else {
    router.navigate(['/']);
  }

  return true;
};