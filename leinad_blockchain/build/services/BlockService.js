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
const block_1 = __importDefault(require("../models/block"));
const blockchain_1 = __importDefault(require("../models/blockchain"));
const claim_type_1 = __importDefault(require("../models/claim_type"));
class BlockService {
    constructor() {
        this.addBlock = () => __awaiter(this, void 0, void 0, function* () {
            return true;
        });
        this.testBlockainV1 = () => __awaiter(this, void 0, void 0, function* () {
            let chain = new blockchain_1.default();
            let block1 = new block_1.default(0, 'ABC123', 1000.0, new Date(), 'QWE123', 1000, claim_type_1.default.TotalLoss(), undefined);
            yield block1.initializeBlock();
            let block2 = new block_1.default(1, 'VBG345', 1200.0, new Date(), 'ASD456', 2000, claim_type_1.default.TotalLoss(), block1);
            yield block2.initializeBlock();
            let block3 = new block_1.default(2, 'XCF234', 3009.0, new Date(), 'GGF777', 3000, claim_type_1.default.TotalLoss(), block2);
            yield block3.initializeBlock();
            let block4 = new block_1.default(3, 'CBHD45', 4000.0, new Date(), 'MMB998', 4000, claim_type_1.default.TotalLoss(), block3);
            yield block4.initializeBlock();
            let block5 = new block_1.default(4, 'MJK677', 5000.0, new Date(), 'PQOQ78', 5000, claim_type_1.default.TotalLoss(), block4);
            yield block5.initializeBlock();
            let block6 = new block_1.default(5, 'KKLJ78', 6000.0, new Date(), 'CVTY98', 6000, claim_type_1.default.TotalLoss(), block5);
            yield block6.initializeBlock();
            let block7 = new block_1.default(6, 'BMB577', 2000.0, new Date(), 'WEVB09', 7000, claim_type_1.default.TotalLoss(), block6);
            yield block7.initializeBlock();
            let block8 = new block_1.default(7, 'OPP988', 8000.0, new Date(), 'XPOR45', 8000, claim_type_1.default.TotalLoss(), block7);
            yield block8.initializeBlock();
            chain.acceptBlock(block1);
            chain.acceptBlock(block2);
            chain.acceptBlock(block3);
            chain.acceptBlock(block4);
            chain.acceptBlock(block5);
            chain.acceptBlock(block6);
            chain.acceptBlock(block7);
            chain.acceptBlock(block8);
            yield chain.verifyChain();
            console.log('');
            console.log('');
            block4.setClaimNumber('CHANGEDDDDDDDD');
            yield chain.verifyChain();
            // console.log(chain);
            console.log('');
        });
    }
}
exports.default = BlockService;
