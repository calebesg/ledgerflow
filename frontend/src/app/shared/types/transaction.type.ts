import { TransactionTypeEnum } from '../../core/enums/transaction-type.enum';

export type Transaction = {
  id: number;
  description: string;
  transactionDate: string;
  amount: number;
  transactionType: TransactionTypeEnum;
};
