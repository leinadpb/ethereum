import Hashing from '../helpers/Hashing';
import Transaction from './Transaction';
import MerkleTreeWrapper from '../common/merkle_tree/MerkleTree';
import KeyStore from './KeyStore';
import Hmac from '../helpers/Hmac';

class Block {
  // Transactions of this block
  private transactions: Transaction[];

  // Block details
  private blockNumber: number;
  private createdDate: Date;
  private blockHash?: string;
  private previousBlockHash?: string;
  private nextBlock?: Block;
  private merkleTree: MerkleTreeWrapper;
  private blockSignature?: string;
  private keyStore?: KeyStore;

  // internals
  private parent?: Block;

  constructor(blockNumber: number, keySore?: KeyStore) {
    this.blockNumber = blockNumber;
    this.createdDate = new Date();
    this.transactions = [];
    this.merkleTree = new MerkleTreeWrapper();

    if (keySore !== undefined) {
      this.keyStore = keySore;
    }
  }

  // Instance methods
  public addTransaction(trans: Transaction | undefined) {
    if (trans !== undefined) {
      this.transactions.push(trans);
    }
  }
  public async initializeBlock() {
    await this.setCurrentBlockHash(this.parent);
  }
  public async calculateBlockHash(prevBlockHash: string | undefined): Promise<string> {
    let blockHeader: string = this.blockNumber.toString() + this.createdDate.toUTCString() + (prevBlockHash !== undefined ? prevBlockHash : '');
    let combined: string = this.merkleTree.getRoot() + blockHeader;
    let digest: string = '';

    if (this.keyStore === undefined) {
      digest = (await Hashing.ComputeHashSHA256(combined)).toString();
    } else {
      digest = (await Hmac.ComputeHmacSHA256(combined, this.keyStore.getAuthenticatedHashKey())).toString();
    }

    return digest;
  }

  public async setCurrentBlockHash(parent: Block | undefined) {
    if (parent !== undefined) {
      this.previousBlockHash = parent.getBlockHash();
      parent.setNextBlock(this);
    } else {
      // Previous block is the Genesis block
      this.previousBlockHash = undefined;
    }
    // Build merkle tree
    await this.buildMerkleTree();

    // Set block hash
    this.blockHash = await this.calculateBlockHash(this.previousBlockHash);

    if (this.keyStore !== undefined) {
      this.blockSignature = this.keyStore.signBlock(this.blockHash);
    }
  }

  private async buildMerkleTree() {
    // Reset leaves of Merkle Tree instance inseide wrapper
    this.merkleTree.resetLeaves();
    // Append calculated hashes for all transaction in merkle tree wrapper
    for (let i = 0; i < this.transactions.length; i++) {
      let tx: Transaction = this.transactions[i];
      // console.log('TO APPEND TX: ', await tx.calculateTransactionHash());
      this.merkleTree.appendLeaf(await tx.calculateTransactionHash());
    }
    // console.log('WILL INIT MT: ', this.merkleTree.getTree());
    // This will create a new instance of MerkleTree inside the MerkleTreeWrapper with the appended hashes
    this.merkleTree.initializeWithSHA256();
  }

  public async isValidChain(prevBlockHash: string | undefined, verbose: boolean): Promise<boolean> {
    let isValid: boolean = true;
    let validSignature: boolean = false;

    // Need to update the Hashes in the Merkle Tree.
    await this.buildMerkleTree();

    if (this.keyStore !== undefined && this.blockHash !== undefined && this.blockSignature) {
      validSignature = this.keyStore?.verifyBlock(this.blockHash, this.blockSignature);
    }

    // Is this a valid block and transaction
    let newBlockHash: string = await this.calculateBlockHash(prevBlockHash);
    // console.log('------');
    // console.log('PASSED PREV HASH ON ISVALID: ', prevBlockHash);
    // console.log('BLOCK PREV HASH ON ISVALID: ', this.previousBlockHash);
    // console.log('NEW HASH ON ISVALID: ', newBlockHash);
    // console.log('CURRENT HASH ON ISVALID: ', this.getBlockHash());
    // console.log('MERKLE TREE ROOT HASH: ', this.merkleTree.getRoot());
    if (newBlockHash !== this.getBlockHash()) {
      isValid = false;
    } else {
      // Does the previous block hash match the latest previous block hash
      isValid = this.previousBlockHash === prevBlockHash;
    }

    this.printVerificationMessage(verbose, isValid, validSignature);
    // console.log('------');

    // Check the next block by passing in our newly calculated blockhash. This will be compared to
    // hash in the next block. They should match for the chain to be valid.
    if (this.nextBlock !== undefined) {
      return this.nextBlock.isValidChain(newBlockHash, verbose);
    }

    return isValid;
  }

  private printVerificationMessage(verbose: boolean, isValid: boolean, validSignature: boolean) {
    if (verbose) {
      if (isValid) {
        console.log('Block Number ', this.blockNumber, ' : PASS VERIFICATION');
      } else {
        console.log('Block Number ', this.blockNumber, ' : FAILED VERIFICATION');
        if (validSignature) {
          console.log('Block Number ', this.blockNumber, ' : PASS DIGITAL SIGNATURE');
        } else {
          console.log('Block Number ', this.blockNumber, ' : FAILED DIGITAL SIGNATURE');
        }
      }
    }
  }

  /**
   * Getters and setter
   *
   **/
  public getTransactions(): Transaction[] {
    return this.transactions;
  }
  public getBlockNumber(): number | undefined {
    return this.blockNumber;
  }
  public setBlockNumber(value: number) {
    this.blockNumber = value;
  }
  public getCreatedDate(): Date | undefined {
    return this.createdDate;
  }
  public setCreatedDate(value: Date) {
    this.createdDate = value;
  }
  public getBlockHash(): string | undefined {
    return this.blockHash;
  }
  public setBlockHash(value: string) {
    this.blockHash = value;
  }
  public getPreviousBlockHash(): string | undefined {
    return this.previousBlockHash;
  }
  public setPreviousBlockHash(value: string | undefined) {
    this.previousBlockHash = value;
  }
  public getNextBlock(): Block | undefined {
    return this.nextBlock;
  }
  public setNextBlock(value: Block) {
    this.nextBlock = value;
  }
  public getBlockSignature(): string | undefined {
    return this.blockSignature;
  }
  public getKeyStore(): KeyStore | undefined {
    return this.keyStore;
  }
}

export default Block;
