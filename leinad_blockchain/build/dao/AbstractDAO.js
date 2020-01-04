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
const pg_1 = require("pg");
const models_1 = require("../common/models");
require('dotenv').config();
class AbstractDAO {
    constructor(DBConn) {
        /**
         * @deprecated stop using this. Use callFunction to call the database.
         */
        this.config = {
            connectionString: process.env.DB_CONN_STRING,
            ssl: true
        };
        this.jsonDataType = 'json';
        this.poolConfig = {
            connectionString: process.env.DB_CONN_STRING,
            ssl: true,
            connectionTimeoutMillis: 60000
        };
        this.getFunctionCall = (functionName, values) => {
            let str = `SELECT * FROM ${functionName} (`;
            values.forEach((value, idx) => {
                if (idx < values.length - 1) {
                    str = str + `$${idx + 1}, `;
                }
                else {
                    str = str + `$${idx + 1}`;
                }
            });
            str = str + `) AS document;`; // AS document is appended, so DB fucntions that returns only a json datatype can be handled with .document
            return str;
        };
        this.callFunction = (functionName, values, isSingle = false, model, dataTypeResult) => {
            let callName = this.getFunctionCall(functionName, values);
            // let pool: Pool = new Pool(this.config);
            console.log('CALL FUNCTION GENERATED NAME: ', callName, values);
            let result = new models_1.DbResult();
            // To measure each request time duration
            console.time(`request:${functionName}`);
            const endTime = (err, completed) => {
                console.timeEnd(`request:${functionName}`);
                console.log(err || !completed ? 'Error' : 'Completed');
            };
            return new Promise((resolve, reject) => {
                let completed = false;
                this.pool
                    .connect()
                    .then((client) => __awaiter(this, void 0, void 0, function* () {
                    return client
                        .query(callName, values)
                        .then(res => {
                        if (res.rowCount > 0) {
                            if (isSingle) {
                                let row = res.rows[0];
                                console.log(row);
                                if (!!model) {
                                    if (dataTypeResult === this.jsonDataType) {
                                        if (!!row.document) {
                                            result.setRow(model.mapObject(row.document));
                                        }
                                        else {
                                            result.setRow({});
                                        }
                                    }
                                    else {
                                        if (!!row) {
                                            result.setRow(model.mapObject(row));
                                        }
                                        else {
                                            result.setRow({});
                                        }
                                    }
                                }
                                else {
                                    if (dataTypeResult === this.jsonDataType) {
                                        result.setRow(row.document);
                                    }
                                    else {
                                        result.setRow(row);
                                    }
                                }
                            }
                            else {
                                let rows = res.rows;
                                console.log(rows);
                                if (!!model) {
                                    if (dataTypeResult === this.jsonDataType) {
                                        if (!!rows[0].document) {
                                            result.setRows(model.mapObjects(rows[0].document));
                                        }
                                        else {
                                            // To avoid set of undefined to object.
                                            result.setRows([]);
                                        }
                                    }
                                    else {
                                        if (!!rows) {
                                            result.setRows(model.mapObjects(rows));
                                        }
                                        else {
                                            result.setRows([]);
                                        }
                                    }
                                }
                                else {
                                    if (dataTypeResult === this.jsonDataType) {
                                        result.setRows(rows[0].document);
                                    }
                                    else {
                                        result.setRows(res.rows);
                                    }
                                }
                            }
                            result.setSuccess(true);
                            resolve(result);
                        }
                        else {
                            result.setSuccess(true);
                            result.setMessage('No records found.');
                            result.setRow({});
                            result.setRows([]);
                            reject(result);
                        }
                        completed = true;
                    })
                        .catch(e => {
                        result.setSuccess(false);
                        result.setError(Object.assign(Object.assign({}, e), { poolLevel: false }));
                        reject(result);
                    })
                        .finally(() => __awaiter(this, void 0, void 0, function* () {
                        client.release();
                        endTime(result.getError(), completed);
                    }));
                }))
                    .catch((e) => {
                    result.setSuccess(false);
                    result.setError(Object.assign(Object.assign({}, e), { poolLevel: true }));
                    reject(result);
                });
            });
        };
        this.DBConn = DBConn;
        /**
         * @deprecated use callFunction instead of creating a new client.
         */
        this.client = new pg_1.Client(this.config);
        this.pool = new pg_1.Pool(this.poolConfig);
    }
}
exports.default = AbstractDAO;
