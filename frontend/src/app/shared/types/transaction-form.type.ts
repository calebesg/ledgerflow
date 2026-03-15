export type TransactionForm = {
  description: string;
  dateTransaction: string;
  amount: number;
  typeTransaction: 'INCOME' | 'EXPENSE';
};
