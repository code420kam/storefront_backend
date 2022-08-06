"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_URL, POSTGRES_USER } = process.env;
exports.default = new pg_1.Pool({
    user: POSTGRES_USER,
    host: POSTGRES_URL,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
});
