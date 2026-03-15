import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryButton } from '../primary-button/primary-button';
import { SecondaryButton } from '../secondary-button/secondary-button';
import { DefaultContainerLayout } from '../default-container-layout/default-container-layout';

@Component({
  selector: 'app-default-login-layout',
  imports: [PrimaryButton, SecondaryButton, DefaultContainerLayout],
  templateUrl: './default-login-layout.html',
  styleUrl: './default-login-layout.css',
})
export class DefaultLoginLayout {
  @Input() pageTitle: string = '';
  @Input() primaryButtonText: string = '';
  @Input() secondaryButtonText: string = '';
  @Input() disablePrimaryButton: boolean = true;

  @Output('submit') onSubmit = new EventEmitter();
  @Output('navigate') onNavigate = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
