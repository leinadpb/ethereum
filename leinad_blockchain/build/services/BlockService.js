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
const Transaction_1 = __importDefault(require("../models/Transaction"));
class BlockService {
    constructor() {
        this.addBlock = () => __awaiter(this, void 0, void 0, function* () {
            return true;
        });
        this.testBlockainV1 = () => __awaiter(this, void 0, void 0, function* () {
            let chain = new blockchain_1.default();
            let tx1 = new Transaction_1.default('ABC123', 1000.0, new Date(), 'QWE123', 1000, claim_type_1.default.TotalLoss());
            let tx2 = new Transaction_1.default('VBG345', 1200.0, new Date(), 'ASD456', 2000, claim_type_1.default.TotalLoss());
            let tx3 = new Transaction_1.default('XCF234', 3009.0, new Date(), 'GGF777', 3000, claim_type_1.default.TotalLoss());
            let tx4 = new Transaction_1.default('CBHD45', 4000.0, new Date(), 'MMB998', 4000, claim_type_1.default.TotalLoss());
            let tx5 = new Transaction_1.default('MJK677', 5000.0, new Date(), 'PQOQ78', 5000, claim_type_1.default.TotalLoss());
            let tx6 = new Transaction_1.default('KKLJ78', 6000.0, new Date(), 'CVTY98', 6000, claim_type_1.default.TotalLoss());
            let tx7 = new Transaction_1.default('BMB577', 2000.0, new Date(), 'WEVB09', 7000, claim_type_1.default.TotalLoss());
            let tx8 = new Transaction_1.default('OPP988', 8000.0, new Date(), 'XPOR45', 8000, claim_type_1.default.TotalLoss());
            let tx9 = new Transaction_1.default('KLG675', 9000.0, new Date(), 'UYT554', 9000, claim_type_1.default.TotalLoss());
            let tx10 = new Transaction_1.default('BNV543', 7500.0, new Date(), 'KKY654', 8300, claim_type_1.default.TotalLoss());
            let tx11 = new Transaction_1.default('ERV7502', 8700.0, new Date(), 'KKH665', 7890, claim_type_1.default.TotalLoss());
            let block1 = new block_1.default(0);
            let block2 = new block_1.default(1);
            let block3 = new block_1.default(2);
            let block4 = new block_1.default(3);
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
            yield block1.setCurrentBlockHash(undefined);
            yield block2.setCurrentBlockHash(block1);
            yield block3.setCurrentBlockHash(block2);
            yield block4.setCurrentBlockHash(block3);
            chain.acceptBlock(block1);
            chain.acceptBlock(block2);
            chain.acceptBlock(block3);
            chain.acceptBlock(block4);
            yield chain.verifyChain();
            console.log('');
            console.log('');
            tx4.setClaimNumber("OMG !!!!!! I'VE CHANGED");
            yield chain.verifyChain();
            // console.log(chain);
            console.log('');
        });
    }
}
exports.default = BlockService;
