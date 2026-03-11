import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.BASE_URL}/auth/login`, { email, password })
      .pipe(tap(this.saveToken));
  }

  register(name: string, email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.BASE_URL}/auth/register`, {
        name,
        email,
        password,
      })
      .pipe(tap(this.saveToken));
  }

  private saveToken({ token }: LoginResponse) {
    sessionStorage.setItem('auth-token', token);
  }
}
