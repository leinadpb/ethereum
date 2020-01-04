import Block from '../models/block';
import Blockchain from '../models/blockchain';
import ClaimType from '../models/claim_type';
import Transaction from '../models/Transaction';
class BlockService {
  constructor() {}

  addBlock = async () => {
    return true;
  };

  testBlockainV1 = async () => {
    let chain: Blockchain = new Blockchain();

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

    let block1: Block = new Block(0);
    let block2: Block = new Block(1);
    let block3: Block = new Block(2);
    let block4: Block = new Block(3);

    block1.addTransaction(tx1);
    block1.addTransaction(tx2);
    block1.addTransaction(tx3);

    block2.addTransaction(tx4);
    block2.addTransaction(tx5);
    block2.addTransaction(tx6);

    block3.addTransaction(tx7);
    block3.addTransaction(tx8);
    block3.addTransaction(tx9);

    block4.addTransaction(tx10);
    block4.addTransaction(tx11);

    await block1.setCurrentBlockHash(undefined);
    await block2.setCurrentBlockHash(block1);
    await block3.setCurrentBlockHash(block2);
    await block4.setCurrentBlockHash(block3);

    chain.acceptBlock(block1);
    chain.acceptBlock(block2);
    chain.acceptBlock(block3);
    chain.acceptBlock(block4);

    await chain.verifyChain();

    console.log('');
    console.log('');

    tx4.setClaimNumber("OMG !!!!!! I'VE CHANGED");

    await chain.verifyChain();

    // console.log(chain);

    console.log('');
  };
}

export default BlockService;
