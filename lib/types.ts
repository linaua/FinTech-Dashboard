export interface Transaction {
  transaction_id: string;
  account_id: string;
  amount: number;
  date: string;
  name: string;
  category: string[] | null;
  merchant_name: string | null;
  pending: boolean;
}

export interface SpendingByCategory {
  category: string;
  total: number;
  color: string;
}

export interface MonthlySpending {
  month: string;
  total: number;
}

export interface AccountSummary {
  accountId: string;
  balance: number;
  totalSpent: number;
  transactionCount: number;
}
