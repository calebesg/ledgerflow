import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionForm } from '../../shared/types/transaction-form.type';
import { Transaction } from '../../shared/types/transaction.type';

@Injectable({
  providedIn: 'root',
})
export class TransactionApiServices {
  private BASE_URL: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  createTransaction(data: TransactionForm) {
    const token = sessionStorage.getItem('auth-token') || '';
    return this.httpClient.post<Transaction>(`${this.BASE_URL}/transaction/new`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getTransactions() {
    const token = sessionStorage.getItem('auth-token') || '';

    return this.httpClient.get<Transaction[]>(`${this.BASE_URL}/transaction/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteTransaction(transactionId: number) {
    const token = sessionStorage.getItem('auth-token') || '';

    return this.httpClient.delete(`${this.BASE_URL}/transaction/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
