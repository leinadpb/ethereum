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
Object.defineProperty(exports, "__esModule", { value: true });
// This is actually a wrapper that kinds of encapsulates object in "Block"
class Blockchain {
    constructor() {
        this.blocks = [];
    }
    acceptBlock(block) {
        // This is first block, so make it the genesis block
        if (this.headBlock === undefined) {
            this.headBlock = block;
            this.headBlock.setPreviousBlockHash(undefined);
        }
        this.currentBlock = block;
        this.blocks.push(block);
    }
    verifyChain() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.headBlock === undefined) {
                throw new Error('Genesis block not set.');
            }
            let isValid = yield this.headBlock.isValidChain(undefined, true);
            if (isValid) {
                console.log('Blockchain integrity intact.');
            }
            else {
                console.log('Blockchain integrity corrupted.');
            }
        });
    }
    /**
     * Getters
     */
    getCurrentBlock() {
        return this.currentBlock;
    }
    getHeadBlock() {
        return this.headBlock;
    }
    getBlocks() {
        return this.blocks;
    }
}
exports.default = Blockchain;
