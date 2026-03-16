import { TransactionTypeEnum } from '../../core/enums/transaction-type.enum';

export type TransactionForm = {
  description: string;
  transactionDate: string;
  amount: number;
  transactionType: TransactionTypeEnum;
};
