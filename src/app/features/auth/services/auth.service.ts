import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { StorageService } from '../../../core/services/storage.service';
import { tap } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _user = signal<User | null>(null);
  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._user());

  private http = inject(HttpService);
  private storage = inject(StorageService);

  login(username: string, password: string) {
    return this.http.post<any>('/login', { username, password })
      .pipe(
        tap(res => {
          this.storage.setToken(res.data?.token);
          this._user.set(res.data?.user);
        })
      );
  }

  logout() {
    this.storage.clear();
    this._user.set(null);
  }

  setUser(user: User) {
    this._user.set(user);
  }
}