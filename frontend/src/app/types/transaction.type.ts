export type Transaction = {
  id: string;
  description: string;
  dateTransaction: string;
  amount: number;
  typeTransaction: 'INCOME' | 'EXPENSE';
};
