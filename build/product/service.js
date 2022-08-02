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
class ProductService {
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            // const con = await db.connect();
            const result = yield db_1.default.query(`SELECT * FROM products`);
            // con.release();
            return result.rows;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const con = await db.connect();
            const result = yield db_1.default.query(`SELECT * FROM products WHERE product_id=${id}`);
            // con.release();
            if (result.rows.length === 0) {
                return null;
            }
            return result.rows;
        });
    }
    static createProductQuery(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const con = await db.connect();
                // if(product.product_category === undefined)
                // {
                //     product.product_category === 
                // }
                const sql = `INSERT INTO products (product_name, product_price, product_category) VALUES ('${product.product_name}', '${product.product_price}', '${product.product_category}')`;
                const result = yield db_1.default.query(sql);
                // con.release;
                return result.rows;
            }
            catch (e) {
                console.log("Error at create Product Query " + e);
            }
        });
    }
    static addProductToOrder(product, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const con = await db.connect();
            const sql = `INSERT INTO orders (quantity, product_id, user_id) VALUES (${product.quantity}, ${product.id}, '${user_id}')`;
            const result = yield db_1.default.query(sql);
            // con.release();
            return result.rows;
        });
    }
}
exports.default = ProductService;
