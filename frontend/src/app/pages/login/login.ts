import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';

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

    console.log(this.loginForm.value);

    const { email, password } = this.loginForm.value as LoginForm;

    this.auth.login(email, password).subscribe({
      next: (message) => this.toastService.success('Login realizado com sucesso!'),
      error: (error) => this.submitError('Verifique os dados de login'),
    });
  }

  submitError(message: string) {
    this.loginForm.reset();
    this.toastService.error(message);
  }

  navigate() {
    this.router.navigateByUrl('/signup');
  }
}
