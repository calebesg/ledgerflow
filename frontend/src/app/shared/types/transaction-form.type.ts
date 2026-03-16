export type TransactionForm = {
  description: string;
  transactionDate: string;
  amount: number;
  transactionType: 'INCOME' | 'EXPENSE';
};
