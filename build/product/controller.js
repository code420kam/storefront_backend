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
const db_1 = __importDefault(require("../db"));
const service_1 = __importDefault(require("./service"));
const jwt = require("jsonwebtoken");
class ProductCtrl {
    static allProducts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield service_1.default.getAllProducts();
            res.send(products);
        });
    }
    ;
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleProduct = yield service_1.default.getById(req.params.id);
            if (singleProduct === null) {
                return res.status(404).send(`Product with id ${req.params.id} not found.`);
            }
            res.send(singleProduct);
        });
    }
    ;
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = {
                product_name: req.body.product_name,
                product_price: req.body.product_price
            };
            yield service_1.default.createProductQuery(product);
            res.json(product);
        });
    }
    ;
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //here we need to decode jwt token to get the user id
            const header = req.headers.authorization;
            if (header !== undefined) {
                const decode = yield jwt.verify(header, "secret12");
                const id = decode.id;
                const sql = `INSERT INTO orders (user_id, product_id, quantity) VALUES (${id}, ${req.body.product_id}, ${req.body.quantity})`;
                const query = yield db_1.default.query(sql);
                return res.send(query.rows);
            }
            ;
            return res.status(401).send("Token required");
        });
    }
    ;
}
exports.default = ProductCtrl;
