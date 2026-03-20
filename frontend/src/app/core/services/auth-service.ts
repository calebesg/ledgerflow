import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { LoginResponse } from '../../shared/types/login-response.type';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { RegisterRequestDTO } from '../../shared/dto/register-request-dto.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.BASE_URL}/auth/login`, { email, password })
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  register(data: RegisterRequestDTO) {
    return this.httpClient
      .post<LoginResponse>(`${this.BASE_URL}/auth/register`, data)
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  private isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Date.now() / 1000;

      if (!decoded || !decoded.exp) return false;

      return decoded.exp > now;
    } catch (error) {
      return false;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? this.isTokenValid(token) : false;
  }

  getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  cleanToken() {
    sessionStorage.removeItem('auth-token');
  }

  private saveToken(token: string) {
    sessionStorage.setItem('auth-token', token);
  }
}
