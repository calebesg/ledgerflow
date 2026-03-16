import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { DefaultContainerLayout } from '../../shared/components/default-container-layout/default-container-layout';
import { ModalAddTransaction } from '../../shared/components/modal-add-transaction/modal-add-transaction';
import { TransactionStoreService } from '../../core/services/transaction-store-service';
import { Transaction } from '../../shared/types/transaction.type';
import { Observable } from 'rxjs';

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
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  visibilityTransactionModal: boolean = false;
  transactions$: Observable<Transaction[]> = new Observable();

  constructor(private store: TransactionStoreService) {
    this.transactions$ = store.transactions$;
  }

  ngOnInit(): void {
    this.store.loadTransactions();

    console.log(this.transactions$);
  }

  changeVisibilityModal() {
    this.visibilityTransactionModal = !this.visibilityTransactionModal;
  }
}
