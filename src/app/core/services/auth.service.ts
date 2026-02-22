import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly api = 'http://localhost:5100/api';

  private _user = signal<User | null>(null);

  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._user());

  // constructor(
  //   private http: HttpClient,
  //   private storage: StorageService
  // ) {}
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/auth/login`, {
      email,
      password
    }).pipe(
      tap(res => {
        this.storage.setToken(res.accessToken);
        this._user.set(res.user);
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