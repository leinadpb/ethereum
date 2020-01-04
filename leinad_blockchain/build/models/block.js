"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hashing_1 = __importDefault(require("../helpers/Hashing"));
const MerkleTree_1 = __importDefault(require("../common/merkle_tree/MerkleTree"));
class Block {
    constructor(blockNumber) {
        this.blockNumber = blockNumber;
        this.createdDate = new Date();
        this.transactions = [];
        this.merkleTree = new MerkleTree_1.default();
    }
    // Instance methods
    addTransaction(trans) {
        this.transactions.push(trans);
    }
    initializeBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setCurrentBlockHash(this.parent);
        });
    }
    calculateBlockHash(prevBlockHash) {
        return __awaiter(this, void 0, void 0, function* () {
            let blockHeader = this.blockNumber.toString() + this.createdDate.toUTCString() + (prevBlockHash !== undefined ? prevBlockHash : '');
            let combined = this.merkleTree.getRoot() + blockHeader;
            // Hash combined value and return it as base64 string
            let digest = yield Hashing_1.default.ComputeHashSHA256(combined);
            return digest.toString();
        });
    }
    setCurrentBlockHash(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parent !== undefined) {
                this.previousBlockHash = parent.getBlockHash();
                parent.setNextBlock(this);
            }
            else {
                // Previous block is the Genesis block
                this.previousBlockHash = undefined;
            }
            // Build merkle tree
            yield this.buildMerkleTree();
            // Set block hash
            this.blockHash = yield this.calculateBlockHash(this.previousBlockHash);
        });
    }
    buildMerkleTree() {
        return __awaiter(this, void 0, void 0, function* () {
            // Reset leaves of Merkle Tree instance inseide wrapper
            this.merkleTree.resetLeaves();
            // Append calculated hashes for all transaction in merkle tree wrapper
            for (let i = 0; i < this.transactions.length; i++) {
                let tx = this.transactions[i];
                // console.log('TO APPEND TX: ', await tx.calculateTransactionHash());
                this.merkleTree.appendLeaf(yield tx.calculateTransactionHash());
            }
            // console.log('WILL INIT MT: ', this.merkleTree.getTree());
            // This will create a new instance of MerkleTree inside the MerkleTreeWrapper with the appended hashes
            this.merkleTree.initializeWithSHA256();
        });
    }
    isValidChain(prevBlockHash, verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            let isValid = true;
            // Need to update the Hashes in the Merkle Tree.
            yield this.buildMerkleTree();
            // Is this a valid block and transaction
            let newBlockHash = yield this.calculateBlockHash(prevBlockHash);
            console.log('------');
            console.log('PASSED PREV HASH ON ISVALID: ', prevBlockHash);
            console.log('BLOCK PREV HASH ON ISVALID: ', this.previousBlockHash);
            console.log('NEW HASH ON ISVALID: ', newBlockHash);
            console.log('CURRENT HASH ON ISVALID: ', this.getBlockHash());
            console.log('MERKLE TREE ROOT HASH: ', this.merkleTree.getRoot());
            if (newBlockHash !== this.getBlockHash()) {
                isValid = false;
            }
            else {
                // Does the previous block hash match the latest previous block hash
                isValid = this.previousBlockHash === prevBlockHash;
            }
            this.printVerificationMessage(verbose, isValid);
            // console.log('------');
            // Check the next block by passing in our newly calculated blockhash. This will be compared to
            // hash in the next block. They should match for the chain to be valid.
            if (this.nextBlock !== undefined) {
                return this.nextBlock.isValidChain(newBlockHash, verbose);
            }
            return isValid;
        });
    }
    printVerificationMessage(verbose, isValid) {
        if (verbose) {
            if (isValid) {
                console.log('Block Number ', this.blockNumber, ' : PASS VERIFICATION');
            }
            else {
                console.log('Block Number ', this.blockNumber, ' : FAILED VERIFICATION');
            }
        }
    }
    /**
     * Getters and setter
     *
     **/
    getTransactions() {
        return this.transactions;
    }
    getBlockNumber() {
        return this.blockNumber;
    }
    setBlockNumber(value) {
        this.blockNumber = value;
    }
    getCreatedDate() {
        return this.createdDate;
    }
    setCreatedDate(value) {
        this.createdDate = value;
    }
    getBlockHash() {
        return this.blockHash;
    }
    setBlockHash(value) {
        this.blockHash = value;
    }
    getPreviousBlockHash() {
        return this.previousBlockHash;
    }
    setPreviousBlockHash(value) {
        this.previousBlockHash = value;
    }
    getNextBlock() {
        return this.nextBlock;
    }
    setNextBlock(value) {
        this.nextBlock = value;
    }
}
exports.default = Block;
