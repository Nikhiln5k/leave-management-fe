import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { Observable, tap } from 'rxjs';
import { HttpService } from './http.service';
import { api_endpoint } from '../config/apiEndpoints';

@Injectable({ providedIn: 'root' })
export class AuthService {
  role = signal<'ADMIN' | 'EMPLOYEE'>('EMPLOYEE'); // set after login
  private apiEndpoint = api_endpoint.employee;

  private _user = signal<User | null>(null);
  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._user());

  private http = inject(HttpService);
  private storage = inject(StorageService);

  setUser(user: User) {
    this._user.set(user);
  }

  setRole(role: 'ADMIN' | 'EMPLOYEE') {
    this.role.set(role);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiEndpoint.login, { username, password }).pipe(
      tap((res) => {
        const user = res.data?.user[0];
        this.storage.setToken(res.data?.token);
        this.setUser(user);
        this.setRole(user?.roleName);
      }),
    );
  }

  logout() {
    this.storage.clear();
    this._user.set(null);
  }
}
