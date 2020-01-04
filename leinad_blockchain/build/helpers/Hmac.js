"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Hmac {
    static ComputeHmacSHA256(data, authKey) {
        return crypto_1.default
            .createHmac('sha256', authKey)
            .update(data)
            .digest('hex');
    }
    static GenerateKey() {
        // just a secure random key
        return crypto_1.default.randomBytes(64).toString('hex');
    }
}
exports.default = Hmac;
