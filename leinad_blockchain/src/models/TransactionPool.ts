import Transaction from './Transaction';

/**
 * On memory Queue just for illustration.
 * This should become something persistent, like RabbitMQ, etc...
 */
class TransactionPool {
  private pool: Transaction[];

  constructor() {
    this.pool = [];
  }

  addTransaction(tx: Transaction) {
    this.pool.push(tx);
  }

  getTransaction(): Transaction | undefined {
    return this.pool.shift();
  }
}

export default TransactionPool;
