import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { DefaultContainerLayout } from '../../shared/components/default-container-layout/default-container-layout';
import { ModalAddTransaction } from '../../shared/components/modal-add-transaction/modal-add-transaction';
import { TransactionStoreService } from '../../core/services/transaction-store-service';
import { Transaction } from '../../shared/types/transaction.type';
import { Observable } from 'rxjs';
import { TransactionTypeEnum } from '../../core/enums/transaction-type.enum';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [
    SummaryCard,
    RouterLink,
    DefaultContainerLayout,
    ModalAddTransaction,
    AsyncPipe,
    DatePipe,
    DecimalPipe,
  ],
  providers: [ToastrService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  visibilityTransactionModal: boolean = false;
  transactions$: Observable<Transaction[]> = new Observable();

  transactionTypeEnum = TransactionTypeEnum;

  constructor(
    private store: TransactionStoreService,
    private toast: ToastrService,
  ) {
    this.transactions$ = store.transactions$;
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

  deleteTransaction(transaction: Transaction) {
    const isConfirmed = confirm(
      'Você realmente de seja apagar a transação ' + transaction.description,
    );

    if (isConfirmed) {
      this.store.removeTransaction(transaction.id);
      this.toast.success('Transação apagada com sucesso!');
    }
  }

  changeVisibilityModal() {
    this.visibilityTransactionModal = !this.visibilityTransactionModal;
  }
}
