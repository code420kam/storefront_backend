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
exports.generateUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const db_1 = __importDefault(require("../db"));
const generateUserToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.SECRET_PW;
    if (secret) {
        // console.log(secret)
        // await db.connect();
        const sql = `SELECT user_id FROM users WHERE (firstname='${user.firstname}') AND (lastname='${user.lastname}')`;
        const query = yield db_1.default.query(sql);
        const id = query.rows[0].user_id;
        // await db.end()
        db_1.default.end();
        return jsonwebtoken_1.default.sign({
            id: id,
            firstname: user.firstname,
            lastname: user.lastname,
        }, secret, { expiresIn: "6000000" });
    }
    else {
        return "invalid secret!";
    }
});
exports.generateUserToken = generateUserToken;
