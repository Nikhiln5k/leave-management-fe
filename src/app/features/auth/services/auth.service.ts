import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { StorageService } from '../../../core/services/storage.service';
import { Observable, tap } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  role = signal<'ADMIN' | 'EMPLOYEE'>('EMPLOYEE'); // set after login

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

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/login', { email, password }).pipe(
      tap((res) => {
        const user = res.data?.user[0];
        this.storage.setToken(res.data?.token);
        this.setUser(user);
        this.setRole(user?.role);
      }),
    );
  }

  logout() {
    this.storage.clear();
    this._user.set(null);
  }
}
