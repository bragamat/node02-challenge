import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const Transactions = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    return response.json({
      transactions: Transactions.all(),
      balance: Transactions.getBalance(),
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const transactionService = new CreateTransactionService(Transactions);
    const newTransaction = transactionService.execute(request.body);
    return response.json(newTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
