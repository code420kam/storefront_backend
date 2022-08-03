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
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../models/user");
const request = (0, supertest_1.default)(server_1.default);
let token;
let user;
const fakeToken = "eyJhbGciOiJIUzI1NiIsIkR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQWRtaW4iLCJsYXN0bmFtZSI6IkFkbWluIiwiaWF0IjoxNjU5NDUzMDM4LCJleHAiOjE2NTk0NTkwMzh9.cscBp1kel02hO-Q5_Jcpd_Eid8qojO5ad5Psxxqng44";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const userToken = jest.fn(user_1.generateUserToken);
    user = {
        firstname: "Admin",
        lastname: "Admin",
        password: "admin"
    };
    token = yield userToken(user);
}));
describe("Testing user Endpoints", () => {
    test("Testing to get All Users with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/user/");
        req.set("Authorization", token);
        expect((yield req).status).toBe(200);
    }));
    test("Trying to get all users with fake token", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/user/");
        req.set("Authorization", fakeToken);
        expect((yield req).status).toBe(401);
    }));
    test("trying to get user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/user/1");
        req.set("Authorization", token);
        expect((yield req).status).toBe(200);
    }));
    test("trying to get not existing user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/user/9999");
        req.set("Authorization", token);
        expect((yield req).status).toBe(404);
    }));
    test("Create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.post("/user/create");
        req.set("Authorization", token);
        req.send({
            "firstname": "examplefirstname",
            "lastname": "examplelastname",
            "passwort": "examplepasswort"
        });
        expect((yield req).status).toBe(200);
    }));
});
describe("Testing products endpoint", () => {
    test("try to get all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/products/");
        expect((yield req).status).toBe(200);
    }));
    test("try to get product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/products/2");
        expect((yield req).status).toBe(200);
    }));
    test("try to get not existing product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/products/9999");
        expect((yield req).status).toBe(404);
    }));
    test("try to create a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.post("/products/create");
        req.set("Authorization", token);
        req.send({
            "product_price": "988",
            "product_name": "example_Product",
        });
        expect((yield req).status).toBe(200);
    }));
    test("try to create a product without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.post("/products/create");
        req.send({
            "product_price": 988,
            "product_name": "example_Product",
        });
        expect((yield req).status).toBe(401);
    }));
});
describe("Testing order endpoint", () => {
    test("Try to get order by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/order/1");
        req.set("Authorization", token);
        expect((yield req).status).toBe(200);
    }));
    test("Try to get a not existing order by user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = request.get("/order/999");
        req.set("Authorization", token);
        expect((yield req).status).toBe(404);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // await closeServer();
}));
