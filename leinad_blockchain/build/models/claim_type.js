"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClaimType {
    constructor(desc) {
        this.description = desc;
    }
    static TotalLoss() {
        return new ClaimType('TOTAL LOSS');
    }
    getDescription() {
        return this.description;
    }
    getString() {
        return this.description;
    }
}
exports.default = ClaimType;
