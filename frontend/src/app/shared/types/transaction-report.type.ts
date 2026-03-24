import { Transaction } from './transaction.type';

export type TransactionReport = {
  userName: string;
  organizationName: string;
  reportPurpose: string;
  reportTitle: string;
  transactions: Transaction[];
};
