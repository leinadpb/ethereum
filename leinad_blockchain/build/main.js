"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Routers imports
const block_router_1 = __importDefault(require("./routes/block_router"));
const app = express_1.default();
require('dotenv').config();
// CORS
app.use(cors_1.default());
app.use(body_parser_1.default.json());
// Routers - will be all protected
app.use('/block', block_router_1.default);
// Default Routes
app.get('/', (req, res) => {
    return res.json({ status: 'success', message: 'Welcome to API Service' });
});
let appPort = !!process.env.PORT ? process.env.PORT : 7000;
app.listen(appPort, '0.0.0.0', () => console.log(`App started at port: ${appPort}`));
