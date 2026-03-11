import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';

type SignupForm = {
  name: string;
  email: string;
  password: string;
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

    console.log(this.signUpForm.value);

    const { email, password } = this.signUpForm.value as SignupForm;

    this.auth.login(email, password).subscribe({
      next: (message) => this.toastService.success('Login realizado com sucesso!'),
      error: (error) => this.submitError('Verifique os dados de login'),
    });
  }

  submitError(message: string) {
    this.signUpForm.reset();
    this.toastService.error(message);
  }

  navigate() {
    this.router.navigateByUrl('/login');
  }
}
