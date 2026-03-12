import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';
import { LoginErrorResponse, LoginResponse } from '../../types/login-response.type';

type SignupForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

@Component({
  selector: 'app-signup',
  imports: [DefaultLoginLayout, PrimaryInput, ReactiveFormsModule],
  providers: [AuthService, ToastrService],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signUpForm!: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastService: ToastrService,
  ) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.signUpForm.invalid) return;

    const { name, email, password, passwordConfirm } = this.signUpForm.value as SignupForm;

    if (password != passwordConfirm) return;

    console.log({ name, email, password });

    this.auth.register(name, email, password).subscribe({
      next: (response) => this.submitSucess(response),
      error: (error) => this.submitError(error),
    });
  }

  private submitSucess(data: LoginResponse) {
    this.toastService.success('Registrado com sucesso!');
    this.router.navigateByUrl('/dashboard');
  }

  private submitError(error: LoginErrorResponse) {
    this.signUpForm.reset();
    this.toastService.error(`${error.status} - ${error.message}`);
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
}
