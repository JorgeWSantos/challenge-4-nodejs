import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {

  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {

    value = Number(value);

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type invalid.');
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (value > balance.total) {
        throw Error('Dont have this money on store.');
      }
    }

    const transactionsCreated = this.transactionsRepository.create({ title, type, value });

    return transactionsCreated;
  }
}

export default CreateTransactionService;
