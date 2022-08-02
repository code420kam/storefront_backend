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
class OrderService {
    static getCurrentOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield db_1.default.connect();
            const sql = yield db_1.default.query(`SELECT *, CASE WHEN order_status=true THEN 'complete' WHEN order_status=false THEN 'active'
        END AS order_status FROM orders WHERE order_status=false AND user_id='${id}'`);
            con.release();
            if (sql.rows.length === 0) {
                return null;
            }
            return sql.rows;
        });
    }
}
exports.default = OrderService;
