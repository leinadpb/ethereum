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
const crypto_js_1 = __importDefault(require("crypto-js"));
class Block {
    constructor(blockNumber, claimNumber, settlementAmount, settlementDate, carRegistration, mileage, claimType, parent) {
        this.blockNumber = blockNumber;
        this.claimNumber = claimNumber;
        this.settlementAmount = settlementAmount;
        this.settlementDate = settlementDate;
        this.carRegistration = carRegistration;
        this.mileage = mileage;
        this.claimType = claimType;
        this.createdDate = new Date();
        this.parent = parent;
    }
    // Instance methods
    initializeBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setCurrentBlockHash(this.parent);
        });
    }
    calculateBlockHash(prevBlockHash) {
        return __awaiter(this, void 0, void 0, function* () {
            let txHash = this.claimNumber + this.settlementAmount.toString() + this.settlementDate.toUTCString() + this.carRegistration + this.mileage.toString() + this.claimType.getString();
            let blockHeader = this.blockNumber.toString() + this.createdDate.toUTCString() + (prevBlockHash !== undefined ? prevBlockHash : '');
            let combined = txHash + blockHeader;
            // Hash combined value and return it as base64 string
            let digest = yield crypto_js_1.default.SHA256(combined);
            // console.log('To calculate hash ------->');
            // console.log('     claimNumber: ', this.claimNumber);
            // console.log('     settlementAmount: ', this.settlementAmount.toString());
            // console.log('     settlementDate: ', this.settlementDate.toUTCString());
            // console.log('     carRegistration: ', this.carRegistration);
            // console.log('     mileage: ', this.mileage.toString());
            // console.log('     claimType: ', this.claimType.getString());
            // console.log('     blockNumber: ', this.blockNumber.toString());
            // console.log('     createdDate: ', this.createdDate.toUTCString());
            // console.log('     previousBlockHash: ', this.previousBlockHash);
            // console.log(combined);
            // console.log(digest);
            // console.log(digest.toString());
            // console.log('---- END Hash calculation ------');
            return digest.toString();
        });
    }
    setCurrentBlockHash(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parent !== undefined) {
                // console.log('ALGO: ', parent);
                this.previousBlockHash = parent.getBlockHash();
                parent.setNextBlock(this);
            }
            else {
                // Previous block is the Genesis block
                this.previousBlockHash = undefined;
            }
            let hash = yield this.calculateBlockHash(this.previousBlockHash);
            // console.log('CALCULATE BLOCK HASH: ', hash);
            this.blockHash = hash;
        });
    }
    isValidChain(prevBlockHash, verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            let isValid = true;
            // Is this a valid block and transaction
            let newBlockHash = yield this.calculateBlockHash(prevBlockHash);
            // console.log('------');
            // console.log('PASSED PREV HASH ON ISVALID: ', prevBlockHash);
            // console.log('BLOCK PREV HASH ON ISVALID: ', this.previousBlockHash);
            // console.log('NEW HASH ON ISVALID: ', newBlockHash);
            // console.log('CURRENT HASH ON ISVALID: ', this.getBlockHash());
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
    getClaimNumber() {
        return this.claimNumber;
    }
    setClaimNumber(value) {
        this.claimNumber = value;
    }
    getSettlementAmount() {
        return this.settlementAmount;
    }
    setSettlementAmount(value) {
        this.settlementAmount = value;
    }
    getSettlementDate() {
        return this.settlementDate;
    }
    setSettlementDate(value) {
        this.settlementDate = value;
    }
    getCarRegistration() {
        return this.carRegistration;
    }
    setCarRegistration(value) {
        this.carRegistration = value;
    }
    getMileage() {
        return this.mileage;
    }
    setMileage(value) {
        this.mileage = value;
    }
    getClaimType() {
        return this.claimType;
    }
    setClaimType(value) {
        this.claimType = value;
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
