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
const Hashing_1 = __importDefault(require("./Hashing"));
const perf_hooks_1 = require("perf_hooks");
class ProoOfWork {
    constructor(data, difficulty) {
        this.nonce = 0;
        this.calculateProofOfWork = () => __awaiter(this, void 0, void 0, function* () {
            let difficultyStr = this.getDifficultyZeroString();
            let startExecutionTime = perf_hooks_1.performance.now();
            let finishExecutionTime;
            let executionTime;
            while (true) {
                let hashedData = yield Hashing_1.default.ComputeHashSHA256(`${this.nonce} ${this.data}`);
                if (hashedData.startsWith(difficultyStr, 0)) {
                    finishExecutionTime = perf_hooks_1.performance.now();
                    executionTime = finishExecutionTime - startExecutionTime; // ms
                    console.log(`Difficulty level: ${this.difficulty} - Nonce: ${this.nonce} - Elapsed Time: ${executionTime} milliseconds.`);
                    console.log(hashedData);
                    console.log('\n');
                    return hashedData;
                }
                this.nonce = this.nonce + 1;
            }
        });
        this.data = data;
        this.difficulty = difficulty;
    }
    getDifficultyZeroString() {
        let str = '';
        let counter = this.difficulty;
        while (counter > 0) {
            str = str + '0';
            counter--;
        }
        return str;
    }
}
exports.default = ProoOfWork;
