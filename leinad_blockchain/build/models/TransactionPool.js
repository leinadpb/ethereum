"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * On memory Queue just for illustration.
 * This should become something persistent, like RabbitMQ, etc...
 */
class TransactionPool {
    constructor() {
        this.pool = [];
    }
    addTransaction(tx) {
        this.pool.push(tx);
    }
    getTransaction() {
        return this.pool.shift();
    }
}
exports.default = TransactionPool;
