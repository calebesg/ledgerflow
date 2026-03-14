import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PrimaryInput } from '../primary-input/primary-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecondaryButton } from '../secondary-button/secondary-button';
import { PrimaryButton } from '../primary-button/primary-button';
import { dateValidator } from '../../utils/date';
import { TransactionForm } from '../../types/transaction-form.type';

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
      dateTransaction: new FormControl('', [Validators.required, dateValidator]),
      typeTransaction: new FormControl<('INCOME' | 'EXPENSE') | null>(null, [Validators.required]),
    });
  }

  closeModal(): void {
    this.onClickCloseModal.emit();
  }

  submit(): void {
    const dataForm = this.formTransaction.value as TransactionForm;

    const dateISO = new Date(dataForm.dateTransaction).toISOString();

    const payload: TransactionForm = { ...dataForm, dateTransaction: dateISO };

    console.log(payload);
  }
}
