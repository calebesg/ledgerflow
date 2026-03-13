import { Component, EventEmitter, Output } from '@angular/core';
import { PrimaryInput } from '../primary-input/primary-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecondaryButton } from '../secondary-button/secondary-button';
import { PrimaryButton } from '../primary-button/primary-button';

@Component({
  selector: 'app-modal-add-transaction',
  imports: [PrimaryInput, ReactiveFormsModule, SecondaryButton, PrimaryButton],
  templateUrl: './modal-add-transaction.html',
  styleUrl: './modal-add-transaction.css',
})
export class ModalAddTransaction {
  formTransaction!: FormGroup;

  @Output('closeModal') onClickCloseModal = new EventEmitter();

  constructor() {
    this.formTransaction = new FormGroup({
      description: new FormControl('', [Validators.maxLength(100), Validators.required]),
      amount: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      typeTransaction: new FormControl('', [Validators.required]),
    });
  }

  closeModal() {
    this.onClickCloseModal.emit();
  }
}
