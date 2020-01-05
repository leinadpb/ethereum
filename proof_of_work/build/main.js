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
const ProofOfWork_1 = __importDefault(require("./ProofOfWork"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let pow0 = new ProofOfWork_1.default('Kick their assses at 4:00 AM', 0);
    let pow1 = new ProofOfWork_1.default('Kick their assses at 4:00 AM', 1);
    let pow2 = new ProofOfWork_1.default('Kick their assses at 4:00 AM', 2);
    let pow3 = new ProofOfWork_1.default('Kick their assses at 4:00 AM', 3);
    let pow4 = new ProofOfWork_1.default('Kick their assses at 4:00 AM', 4);
    let pow5 = new ProofOfWork_1.default('Kick their assses at 4:00 AM', 5);
    let pow6 = new ProofOfWork_1.default('Kick their assses at 4:00 AM', 6);
    yield pow0.calculateProofOfWork();
    yield pow1.calculateProofOfWork();
    yield pow2.calculateProofOfWork();
    yield pow3.calculateProofOfWork();
    yield pow4.calculateProofOfWork();
    yield pow5.calculateProofOfWork();
    yield pow6.calculateProofOfWork();
});
main();
