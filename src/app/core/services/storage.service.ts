import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  private readonly token = 'access_token';

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  clear() {
    localStorage.clear();
  }
}