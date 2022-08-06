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
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const con = await client.connect();
            const result = yield db_1.default.query(`SELECT * FROM users WHERE user_id=${id}`);
            if (result.rows.length === 0) {
                return undefined;
            }
            return result.rows;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // const con = await client.connect();
            const result = yield db_1.default.query(`SELECT * from users`);
            // con.release();
            return result.rows;
        });
    }
    static newUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const con = await db.connect();
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hashSync(user.password + process.env.SECRET_PW, salt);
                const sql = `INSERT INTO users (firstname, lastname, password) VALUES ('${user.firstname}', '${user.lastname}', '${hash}')`;
                console.log(`New User ${user.firstname} ${user.lastname} successfully created`);
                const result = yield db_1.default.query(sql);
                // con.release();
                return result.rows;
            }
            catch (e) {
                console.log('Wrong values passed ' + e);
            }
        });
    }
    static getPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // const con = await db.connect();
            const sql = `SELECT password FROM users WHERE (firstname='${user.firstname}') AND (lastname='${user.lastname}') `;
            const result = yield db_1.default.query(sql);
            const pw = user.password + 'secret12';
            // con.release();
            if (bcrypt_1.default.compareSync(pw, result.rows[0].password)) {
                return user;
            }
            return null;
        });
    }
}
exports.default = UserService;
