import merkle from 'merkle';
import CryptoJS from 'crypto-js';

class MerkleTreeWrapper {
  private leaves: string[];
  private merkleTree?: any;

  constructor() {
    this.leaves = [];
  }

  public appendLeaf(txHash: string) {
    this.leaves.push(txHash);
  }

  initializeWithSHA256() {
    // console.log('INSIDE MT: leaves', this.leaves);
    if (this.leaves === undefined || this.leaves.length === 0) {
      throw new Error('Block has 0 transactions. Cannot create Merkle Tree.');
    }
    // console.log('INSIDE MT: merkleTree before', this.merkleTree);
    this.merkleTree = merkle('sha256').sync(this.leaves);
    // console.log('INSIDE MT: merkleTree after init', this.merkleTree);
  }

  getRoot(): string | undefined {
    if (this.merkleTree !== undefined) {
      return this.merkleTree.root();
    }
    throw new Error('Merkle Tree is not initialized yet.');
  }

  resetLeaves() {
    this.leaves = [];
  }

  getTree(): any {
    return this.merkleTree;
  }

  getProofLeaf(leaf: string): any {
    if (this.merkleTree === undefined) {
      throw new Error('Merkle Tree has not been initialized.');
    }
    return this.merkleTree.getProof(leaf);
  }

  verifyLeafInTree(proof: any, leaf: string): boolean {
    if (this.merkleTree === undefined) {
      throw new Error('Merkle Tree has not been initialized.');
    }
    return this.merkleTree.verify(proof, leaf, this.getRoot());
  }

  buildTree() {
    if (this.merkleTree === undefined) {
      throw new Error('Merkle Tree has not been initialized.');
    }
    this.merkleTree.createHashes(this.leaves);
  }
}

export default MerkleTreeWrapper;
