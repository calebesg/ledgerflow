import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultLoginLayout } from './components/default-login-layout/default-login-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DefaultLoginLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
