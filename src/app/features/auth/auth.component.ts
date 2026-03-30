import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { StorageService } from '../../core/services/storage.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginForm: FormGroup;

  role = signal<'ADMIN' | 'EMPLOYEE'>('EMPLOYEE'); 
  private _user = signal<User | null>(null);
  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._user());

  private storage = inject(StorageService);

  setUser(user: User) {
    this._user.set(user);
  }

  setRole(role: 'ADMIN' | 'EMPLOYEE') {
    this.role.set(role);
  }


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    // console.log('Form Values:', this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        this.storage.setToken(res.data?.token);
        this.setUser(res.data?.user);
        this.setRole(res.data?.user?.[0].role);
        this.toastr.success(res?.message || "Login Success");
      },
      error: (err: any) => {
        this.toastr.error(err.statusText);
      },
    });
  }
}
