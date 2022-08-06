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
exports.closeServer = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const router_1 = __importDefault(require("./user/router"));
const router_2 = __importDefault(require("./product/router"));
const router_3 = __importDefault(require("./order/router"));
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT;
const address = process.env.POSTGRES_URL;
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/user', router_1.default);
app.use('/products', router_2.default);
app.use('/order', router_3.default);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
// server.listen(port)
exports.server = app.listen(port, () => {
    console.log(`Listening on ${address}:${port}`);
});
const closeServer = () => __awaiter(void 0, void 0, void 0, function* () { return yield exports.server.close(); });
exports.closeServer = closeServer;
exports.default = app;
