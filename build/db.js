"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_URL, POSTGRES_USER, ENV, POSTGRES_TEST_DB } = process.env;
let client = new pg_1.Pool;
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_URL,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_URL,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = client;
