import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
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
    const transactionsClone = [...this.transactions];

    const outcome: number = transactionsClone
      .filter(transaction => transaction.type === 'outcome')
      .reduce<number>((total, transaction) => {
        return total + transaction.value;
      }, 0);

    const income: number = transactionsClone
      .filter(transaction => transaction.type === 'income')
      .reduce<number>((total, transaction) => {
        return total + transaction.value;
      }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
