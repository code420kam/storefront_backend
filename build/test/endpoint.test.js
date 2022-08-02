"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const server_1 = __importStar(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const db_1 = __importDefault(require("../db"));
const user_1 = require("../models/user");
const request = (0, supertest_1.default)(server_1.default);
let token;
let user;
const fakeToken = "eyJhbGciOiJIUzI1NiIsIkR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQWRtaW4iLCJsYXN0bmFtZSI6IkFkbWluIiwiaWF0IjoxNjU5NDUzMDM4LCJleHAiOjE2NTk0NTkwMzh9.cscBp1kel02hO-Q5_Jcpd_Eid8qojO5ad5Psxxqng44";
describe("Testing user Endpoints", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // db.connect();
        const userToken = jest.fn(user_1.generateUserToken);
        user = {
            firstname: "Admin",
            lastname: "Admin",
            password: "admin"
        };
        token = yield userToken(user);
    }));
    test("Testing to get All Users without token", () => __awaiter(void 0, void 0, void 0, function* () {
        return request
            .get("/user/")
            .expect(401);
    }));
    test("Try to login", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.default)
            .post("/user/login")
            .send({ user })
            .set("Authorization", token)
            .end((err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(res.header);
        });
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, server_1.closeServer)();
    yield db_1.default.end();
}));
