"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoleRouter = express_1.default.Router();
const role_controller_1 = require("../controllers/role/role_controller");
RoleRouter.post('/', role_controller_1.addRole);
RoleRouter.get('/', role_controller_1.getRoles);
exports.default = RoleRouter;
