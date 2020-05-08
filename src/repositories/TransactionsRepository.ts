import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (total: number, obj: Transaction) =>
        total + (obj.type === 'income' ? obj.value : 0),
      0,
    );
    const outcome = this.transactions.reduce(
      (total: number, obj: Transaction) =>
        total + (obj.type === 'outcome' ? obj.value : 0),
      0,
    );

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push({ ...transaction });
    return transaction;
  }
}

export default TransactionsRepository;
