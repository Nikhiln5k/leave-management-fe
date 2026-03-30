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
        if (!res?.success) {
          this.toastr.error(res?.message || 'Login failed');
          return;
        }
        const user = this.authService.user();
        if (!user) {
          this.toastr.error('User data not found');
          return;
        }
        const target =
        user?.role === 'ADMIN'
          ? '/dashboard/admin'
          : '/dashboard/employee';

        this.router.navigate([target]);
        this.toastr.success(res.message || 'Login Success');
      },
      error: (err: any) => {
        this.toastr.error(err.statusText);
      },
    });
  }
}
