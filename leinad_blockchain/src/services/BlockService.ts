import Block from '../models/block';
import Blockchain from '../models/blockchain';
import ClaimType from '../models/claim_type';

class BlockService {
  constructor() {}

  addBlock = async () => {
    return true;
  };

  testBlockainV1 = async () => {
    let chain: Blockchain = new Blockchain();

    let block1: Block = new Block(0, 'ABC123', 1000.0, new Date(), 'QWE123', 1000, ClaimType.TotalLoss(), undefined);
    await block1.initializeBlock();
    let block2: Block = new Block(1, 'VBG345', 1200.0, new Date(), 'ASD456', 2000, ClaimType.TotalLoss(), block1);
    await block2.initializeBlock();
    let block3: Block = new Block(2, 'XCF234', 3009.0, new Date(), 'GGF777', 3000, ClaimType.TotalLoss(), block2);
    await block3.initializeBlock();
    let block4: Block = new Block(3, 'CBHD45', 4000.0, new Date(), 'MMB998', 4000, ClaimType.TotalLoss(), block3);
    await block4.initializeBlock();
    let block5: Block = new Block(4, 'MJK677', 5000.0, new Date(), 'PQOQ78', 5000, ClaimType.TotalLoss(), block4);
    await block5.initializeBlock();
    let block6: Block = new Block(5, 'KKLJ78', 6000.0, new Date(), 'CVTY98', 6000, ClaimType.TotalLoss(), block5);
    await block6.initializeBlock();
    let block7: Block = new Block(6, 'BMB577', 2000.0, new Date(), 'WEVB09', 7000, ClaimType.TotalLoss(), block6);
    await block7.initializeBlock();
    let block8: Block = new Block(7, 'OPP988', 8000.0, new Date(), 'XPOR45', 8000, ClaimType.TotalLoss(), block7);
    await block8.initializeBlock();

    chain.acceptBlock(block1);
    chain.acceptBlock(block2);
    chain.acceptBlock(block3);
    chain.acceptBlock(block4);
    chain.acceptBlock(block5);
    chain.acceptBlock(block6);
    chain.acceptBlock(block7);
    chain.acceptBlock(block8);

    await chain.verifyChain();

    console.log('');
    console.log('');

    block4.setClaimNumber('CHANGEDDDDDDDD');

    await chain.verifyChain();

    // console.log(chain);

    console.log('');
  };
}

export default BlockService;
