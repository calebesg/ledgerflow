import { Injectable } from '@angular/core';
import { TransactionApiServices } from './transaction-api-services';
import { Transaction } from '../../shared/types/transaction.type';
import { TransactionForm } from '../../shared/types/transaction-form.type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionStoreService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$: Observable<Transaction[]> = this.transactionsSubject.asObservable();

  constructor(private api: TransactionApiServices) {}

  loadTransactions() {
    this.api.getTransactions().subscribe({
      next: (data) => this.transactionsSubject.next(data),
      error: (error) => console.warn(`LOAD TRANSACTION: ${error}`),
    });
  }

  addTransaction(transaciton: TransactionForm) {
    this.api.createTransaction(transaciton).subscribe({
      next: (data) => this.transactionsSubject.next([data, ...this.transactionsSubject.value]),
      error: (error) => console.warn(`ADD TRANSACTION: ${error}`),
    });
  }
}
