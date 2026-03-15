import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginErrorResponse } from '../../shared/types/login-response.type';
import { DefaultLoginLayout } from '../../shared/components/default-login-layout/default-login-layout';
import { AuthService } from '../../core/services/auth-service';
import { PrimaryInput } from '../../shared/components/primary-input/primary-input';

type LoginForm = {
  email: string;
  password: string;
};

@Component({
  selector: 'app-login',
  imports: [DefaultLoginLayout, ReactiveFormsModule, PrimaryInput],
  providers: [AuthService, ToastrService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastService: ToastrService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value as LoginForm;

    this.auth.login(email, password).subscribe({
      next: (response) => this.submitSucess(),
      error: (error: HttpErrorResponse) => this.submitError(error.error),
    });
  }

  submitSucess() {
    this.toastService.success('Login realizado com sucesso!');
    this.router.navigateByUrl('/dashboard');
  }

  submitError(error: LoginErrorResponse) {
    this.loginForm.reset();
    this.toastService.error(`${error.status} - ${error.message}`);
  }

  navigate() {
    this.router.navigateByUrl('/signup');
  }
}
