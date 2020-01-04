"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DbResult {
    constructor() {
        this.success = false;
        this.rows = [];
        this.row = undefined;
        this.error = undefined;
        this.message = undefined;
        this.setMessage = (msg) => {
            this.message = msg;
        };
        this.getMessage = () => {
            return this.message;
        };
        this.setSuccess = (succces) => {
            this.success = succces;
        };
        this.setRow = (data) => {
            this.row = data;
        };
        this.setRows = (data) => {
            this.rows = data;
        };
        this.setError = (error) => {
            this.error = error;
        };
        this.getError = () => {
            return this.error;
        };
        this.getRow = () => {
            return this.row;
        };
        this.getRows = () => {
            return this.rows;
        };
        this.getSuccess = () => {
            return this.success;
        };
    }
}
exports.DbResult = DbResult;
