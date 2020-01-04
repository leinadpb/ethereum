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
const AbstractDAO_1 = __importDefault(require("./AbstractDAO"));
const pg_1 = require("pg");
class RoleDAO extends AbstractDAO_1.default {
    constructor() {
        super(); // Initialize AbstractDAO
        this.addRole = (roleName) => {
            let client = new pg_1.Client(this.config);
            return new Promise((resolve, reject) => {
                client
                    .connect()
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    let result = yield client.query(`SELECT create_role('${roleName}');`);
                    if (result.rows[0]) {
                        resolve(result.rows[0].create_role);
                    }
                    else {
                        resolve('No Role was added!');
                    }
                }))
                    .catch(e => {
                    reject(e);
                })
                    .finally(() => __awaiter(this, void 0, void 0, function* () {
                    yield client.end();
                }));
            });
        };
        this.getRoles = () => __awaiter(this, void 0, void 0, function* () {
            let client = new pg_1.Client(this.config);
            return new Promise((resolve, reject) => {
                client
                    .connect()
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    let result = yield client.query(`SELECT get_roles();`);
                    if (result.rowCount > 0) {
                        console.log;
                        resolve(result.rows.map(r => {
                            return {
                                role_id: r.get_roles.role_id,
                                name: r.get_roles.name
                            };
                        }));
                    }
                    else {
                        resolve([]);
                    }
                }))
                    .catch(e => {
                    reject(e);
                })
                    .finally(() => __awaiter(this, void 0, void 0, function* () {
                    yield client.end();
                }));
            });
        });
    }
}
exports.default = RoleDAO;
