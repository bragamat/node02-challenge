import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionDTO): Transaction {
    const typeData = type === 'outcome';
    const invalidBal = this.transactionsRepository.getBalance().total < value;
    const newTransaction = new Transaction({ title, type, value });
    this.transactionsRepository.create(newTransaction);
    if (typeData && invalidBal) throw Error('Invalid Balance');

    return newTransaction;
  }
}

export default CreateTransactionService;
