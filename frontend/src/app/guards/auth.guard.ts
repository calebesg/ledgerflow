import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('auth-token');

    if (token) return true;

    this.route.navigate(['/login']);
    return false;
  }
}
