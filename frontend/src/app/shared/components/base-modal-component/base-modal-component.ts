import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SecondaryButton } from '../secondary-button/secondary-button';
import { PrimaryButton } from '../primary-button/primary-button';

@Component({
  selector: 'app-base-modal-component',
  templateUrl: './base-modal-component.html',
  styleUrl: './base-modal-component.css',
  imports: [SecondaryButton, PrimaryButton],
})
export class BaseModalComponent {
  @Input() modalTitle: string = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
