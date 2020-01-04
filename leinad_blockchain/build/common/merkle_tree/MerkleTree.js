"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merkle_1 = __importDefault(require("merkle"));
class MerkleTreeWrapper {
    constructor() {
        this.leaves = [];
    }
    appendLeaf(txHash) {
        this.leaves.push(txHash);
    }
    initializeWithSHA256() {
        // console.log('INSIDE MT: leaves', this.leaves);
        if (this.leaves === undefined || this.leaves.length === 0) {
            throw new Error('Block has 0 transactions. Cannot create Merkle Tree.');
        }
        // console.log('INSIDE MT: merkleTree before', this.merkleTree);
        this.merkleTree = merkle_1.default('sha256').sync(this.leaves);
        // console.log('INSIDE MT: merkleTree after init', this.merkleTree);
    }
    getRoot() {
        if (this.merkleTree !== undefined) {
            return this.merkleTree.root();
        }
        throw new Error('Merkle Tree is not initialized yet.');
    }
    resetLeaves() {
        this.leaves = [];
    }
    getTree() {
        return this.merkleTree;
    }
    getProofLeaf(leaf) {
        if (this.merkleTree === undefined) {
            throw new Error('Merkle Tree has not been initialized.');
        }
        return this.merkleTree.getProof(leaf);
    }
    verifyLeafInTree(proof, leaf) {
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
exports.default = MerkleTreeWrapper;
