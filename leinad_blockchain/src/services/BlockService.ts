import Block from '../models/block';
import Blockchain from '../models/blockchain';
import ClaimType from '../models/claim_type';
import Transaction from '../models/Transaction';
import KeyStore from '../models/KeyStore';
import Hmac from '../helpers/Hmac';
import TransactionPool from '../models/TransactionPool';
class BlockService {
  private txPool: TransactionPool;

  constructor() {
    this.txPool = new TransactionPool();
  }

  addBlock = async () => {
    return true;
  };

  private setUpTransactions(): Transaction {
    let tx1: Transaction = new Transaction('ABC123', 1000.0, new Date(), 'QWE123', 1000, ClaimType.TotalLoss());
    let tx2: Transaction = new Transaction('VBG345', 1200.0, new Date(), 'ASD456', 2000, ClaimType.TotalLoss());
    let tx3: Transaction = new Transaction('XCF234', 3009.0, new Date(), 'GGF777', 3000, ClaimType.TotalLoss());
    let tx4: Transaction = new Transaction('CBHD45', 4000.0, new Date(), 'MMB998', 4000, ClaimType.TotalLoss());
    let tx5: Transaction = new Transaction('MJK677', 5000.0, new Date(), 'PQOQ78', 5000, ClaimType.TotalLoss());
    let tx6: Transaction = new Transaction('KKLJ78', 6000.0, new Date(), 'CVTY98', 6000, ClaimType.TotalLoss());
    let tx7: Transaction = new Transaction('BMB577', 2000.0, new Date(), 'WEVB09', 7000, ClaimType.TotalLoss());
    let tx8: Transaction = new Transaction('OPP988', 8000.0, new Date(), 'XPOR45', 8000, ClaimType.TotalLoss());
    let tx9: Transaction = new Transaction('KLG675', 9000.0, new Date(), 'UYT554', 9000, ClaimType.TotalLoss());
    let tx10: Transaction = new Transaction('BNV543', 7500.0, new Date(), 'KKY654', 8300, ClaimType.TotalLoss());
    let tx11: Transaction = new Transaction('ERV7502', 8700.0, new Date(), 'KKH665', 7890, ClaimType.TotalLoss());

    this.txPool.addTransaction(tx1);
    this.txPool.addTransaction(tx2);
    this.txPool.addTransaction(tx3);
    this.txPool.addTransaction(tx4);
    this.txPool.addTransaction(tx5);
    this.txPool.addTransaction(tx6);
    this.txPool.addTransaction(tx7);
    this.txPool.addTransaction(tx8);
    this.txPool.addTransaction(tx9);
    this.txPool.addTransaction(tx10);
    this.txPool.addTransaction(tx11);

    return tx5;
  }

  testBlockainV1 = async () => {
    let txn5: Transaction = this.setUpTransactions();

    // Using on memory, in real life, you may want to persist it somewhere.
    let authKey: string = Hmac.GenerateKey();
    let keySotore: KeyStore = new KeyStore(authKey);
    console.log('Key store: ', keySotore);

    let block1: Block = new Block(0, keySotore);
    let block2: Block = new Block(1, keySotore);
    let block3: Block = new Block(2, keySotore);
    let block4: Block = new Block(3, keySotore);

    await this.addTransactionsToBlocksAndCalculateHashes(block1, block2, block3, block4);

    let chain: Blockchain = new Blockchain();
    chain.acceptBlock(block1);
    chain.acceptBlock(block2);
    chain.acceptBlock(block3);
    chain.acceptBlock(block4);

    await chain.verifyChain();

    console.log('');
    console.log('');

    txn5.setClaimNumber("OMG !!!!!! I'VE CHANGED");

    await chain.verifyChain();

    // console.log(chain);

    console.log('');
  };

  private async addTransactionsToBlocksAndCalculateHashes(block1: Block, block2: Block, block3: Block, block4: Block) {
    block1.addTransaction(this.txPool.getTransaction());
    block1.addTransaction(this.txPool.getTransaction());
    block1.addTransaction(this.txPool.getTransaction());

    block2.addTransaction(this.txPool.getTransaction());
    block2.addTransaction(this.txPool.getTransaction());
    block2.addTransaction(this.txPool.getTransaction());

    block3.addTransaction(this.txPool.getTransaction());
    block3.addTransaction(this.txPool.getTransaction());
    block3.addTransaction(this.txPool.getTransaction());

    block4.addTransaction(this.txPool.getTransaction());
    block4.addTransaction(this.txPool.getTransaction());

    await block1.setCurrentBlockHash(undefined);
    await block2.setCurrentBlockHash(block1);
    await block3.setCurrentBlockHash(block2);
    await block4.setCurrentBlockHash(block3);
  }
}

export default BlockService;
