export type Transaction = {
  id: string;
  description: string;
  transactionDate: string;
  amount: number;
  transactionType: 'INCOME' | 'EXPENSE';
};
