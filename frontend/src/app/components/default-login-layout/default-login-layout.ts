import { Component, Input } from '@angular/core';
import { PrimaryButton } from '../primary-button/primary-button';
import { SecondaryButton } from '../secondary-button/secondary-button';

@Component({
  selector: 'app-default-login-layout',
  imports: [PrimaryButton, SecondaryButton],
  templateUrl: './default-login-layout.html',
  styleUrl: './default-login-layout.css',
})
export class DefaultLoginLayout {
  @Input() pageTitle: string = '';
  @Input() primaryButtonText: string = '';
  @Input() secondaryButtonText: string = '';
}
