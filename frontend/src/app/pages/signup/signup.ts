import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginErrorResponse, LoginResponse } from '../../shared/types/login-response.type';
import { DefaultLoginLayout } from '../../shared/components/default-login-layout/default-login-layout';
import { PrimaryInput } from '../../shared/components/primary-input/primary-input';
import { AuthService } from '../../core/services/auth-service';
import { RegisterRequestDTO } from '../../shared/dto/register-request-dto.type';

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

      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      purpose: new FormControl('', [Validators.required, Validators.minLength(3)]),
      reportTitle: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  submit() {
    if (this.signUpForm.invalid) return;

    const registerDto = this.signUpForm.value as RegisterRequestDTO;

    if (registerDto.password != registerDto.passwordConfirm) return;

    this.auth.register(registerDto).subscribe({
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
