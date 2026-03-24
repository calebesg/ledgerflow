import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { DefaultContainerLayout } from '../../shared/components/default-container-layout/default-container-layout';
import { BaseModalComponent } from '../../shared/components/base-modal-component/base-modal-component';
import { TransactionStoreService } from '../../core/services/transaction-store-service';
import { Transaction } from '../../shared/types/transaction.type';
import { flatMap, Observable } from 'rxjs';
import { TransactionTypeEnum } from '../../core/enums/transaction-type.enum';
import { ToastrService } from 'ngx-toastr';
import { PrimaryInput } from '../../shared/components/primary-input/primary-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateValidator } from '../../shared/utils/date';
import { TransactionForm } from '../../shared/types/transaction-form.type';
import { PdfService } from '../../core/services/pdf-service';

type ModalConfimation = {
  visible: boolean;
  refTransaction: Transaction | null;
};

@Component({
  selector: 'app-dashboard',
  imports: [
    SummaryCard,
    RouterLink,
    DefaultContainerLayout,
    AsyncPipe,
    DatePipe,
    DecimalPipe,
    PrimaryInput,
    ReactiveFormsModule,
    BaseModalComponent,
  ],
  providers: [ToastrService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  formTransaction!: FormGroup;
  transactions$: Observable<Transaction[]> = new Observable();

  modalTransactionVisible: boolean = false;
  modalConfirmation: ModalConfimation = {
    visible: false,
    refTransaction: null,
  };

  transactionTypeEnum = TransactionTypeEnum;

  constructor(
    private store: TransactionStoreService,
    private toast: ToastrService,
    private pdfService: PdfService,
  ) {
    this.transactions$ = store.transactions$;

    this.formTransaction = new FormGroup({
      description: new FormControl('', [Validators.maxLength(100), Validators.required]),
      amount: new FormControl('', [Validators.required]),
      transactionDate: new FormControl('', [Validators.required, dateValidator]),
      transactionType: new FormControl<TransactionTypeEnum | null>(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.store.loadTransactions();
  }

  getCurrentBalance() {
    let currentBalance = 0;

    this.transactions$.subscribe({
      next: (data) =>
        data.forEach((item) => {
          if (item.transactionType == this.transactionTypeEnum.INCOME) {
            currentBalance += item.amount;
          } else if (item.transactionType == this.transactionTypeEnum.EXPENSE) {
            currentBalance -= item.amount;
          }
        }),
    });

    return currentBalance;
  }

  getTotalTransactionType(type: TransactionTypeEnum) {
    let total = 0;

    this.transactions$.subscribe({
      next: (data) => {
        data.forEach((transaction) => {
          if (transaction.transactionType == type) {
            total += transaction.amount;
          }
        });
      },
    });

    return total;
  }

  openModalConfirmation(transaction: Transaction) {
    this.modalConfirmation.visible = true;
    this.modalConfirmation.refTransaction = transaction;
  }

  closeModalConfirmation() {
    this.modalConfirmation.visible = false;
    this.modalConfirmation.refTransaction = null;
  }

  confirmDeleteTransaction() {
    if (this.modalConfirmation.refTransaction == null) return;

    this.store.removeTransaction(this.modalConfirmation.refTransaction.id);
    this.toast.success(`O item ${this.modalConfirmation.refTransaction.description} foi removido!`);
    this.closeModalConfirmation();
  }

  submit(): void {
    if (this.formTransaction.invalid) return;

    const dataForm = this.formTransaction.value as TransactionForm;

    const dateISO = new Date(dataForm.transactionDate).toISOString().split('T')[0];
    const payload: TransactionForm = { ...dataForm, transactionDate: dateISO };

    this.store.addTransaction(payload);
    this.closeModalTransaction();
  }

  openModalTransaction() {
    this.modalTransactionVisible = true;
  }

  closeModalTransaction() {
    this.formTransaction.reset();
    this.modalTransactionVisible = false;
  }

  generatePdf() {
    this.pdfService.generateTransactionsReport();
  }
}
