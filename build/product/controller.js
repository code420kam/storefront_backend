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
const service_1 = __importDefault(require("./service"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
class ProductCtrl {
    static allProducts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield service_1.default.getAllProducts();
            res.send(products);
        });
    }
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleProduct = yield service_1.default.getById(req.params.id);
            if (singleProduct === null) {
                return res.status(404).send(`Product with id ${req.params.id} not found.`);
            }
            res.send(singleProduct);
        });
    }
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = {
                product_name: req.body.product_name,
                product_price: req.body.product_price,
                product_category: req.body.product_category,
            };
            yield service_1.default.createProductQuery(product);
            res.json(product);
        });
    }
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.length);
            //here we need to decode jwt token to get the user id
            const token = req.header('authorization');
            if (token !== undefined) {
                const data = {
                    product_id: req.body.product_id,
                    quantity: req.body.quantity,
                };
                const payload = yield (0, jwt_decode_1.default)(token);
                console.log(payload.id);
                yield service_1.default.createOrderFromProduct(payload.id, data);
                return res.send(`Product with ID ${data.product_id} is successfull added`);
            }
            return res.status(401).send('Token required');
        });
    }
}
exports.default = ProductCtrl;
