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
class Transaction {
    constructor(claimNumber, settlementAmount, settlementDate, carRegistration, mileage, claimType) {
        this.claimNumber = claimNumber;
        this.settlementAmount = settlementAmount;
        this.settlementDate = settlementDate;
        this.carRegistration = carRegistration;
        this.mileage = mileage;
        this.claimType = claimType;
    }
    calculateTransactionHash() {
        return __awaiter(this, void 0, void 0, function* () {
            let transData = this.claimNumber + this.settlementAmount + this.settlementDate.toUTCString() + this.carRegistration + this.mileage + this.claimType.getString();
            return yield Hashing_1.default.ComputeHashSHA256(transData);
        });
    }
    /**
     * Getters and setter
     */
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
}
exports.default = Transaction;
