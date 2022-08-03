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
const service_1 = __importDefault(require("../user/service"));
const service_2 = __importDefault(require("../product/service"));
const service_3 = __importDefault(require("../order/service"));
describe("Testing user models", () => {
    test("Get by Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service_1.default.getById("1");
        expect(result).toBeDefined();
    }));
    test("Try to get User by Id with wrong Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service_1.default.getById("9999");
        expect(result).toBeUndefined();
    }));
    test("Get All", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service_1.default.getAll();
        expect(typeof (result)).toBe("object");
    }));
    test("Try to get password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstname: "Admin",
            lastname: "Admin",
            password: "admin"
        };
        const result = yield service_1.default.getPassword(user);
        expect(result).not.toBeNull();
    }));
    test("Try to get password with wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstname: "Admin",
            lastname: "Admin",
            password: "admn"
        };
        const result = yield service_1.default.getPassword(user);
        expect(result).toBeNull();
    }));
    test("try creating new User", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstname: "exampleFirstname",
            lastname: "exampleLastname",
            password: "examplepw",
        };
        const result = yield service_1.default.newUser(user);
        expect(result).toStrictEqual([]);
    }));
});
describe("Testing products models", () => {
    test("Get all Products", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service_2.default.getAllProducts();
        expect(result).toBeDefined();
    }));
    test("Get product by Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service_2.default.getById("1");
        expect(result).not.toBeNull();
    }));
    test("Get product by not existing id", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service_2.default.getById("999");
        expect(result).toBeNull();
    }));
    test("Create a Product", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            product_name: "exampleProduct",
            product_price: 729,
            product_category: "example"
        };
        const result = yield service_2.default.createProductQuery(product);
        expect(result).toStrictEqual([]);
    }));
    describe("Testing order models", () => {
        test("get current order", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield service_3.default.getCurrentOrder("1");
            expect(result).not.toBeNull();
        }));
        test("get not existing current order", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield service_3.default.getCurrentOrder("999");
            expect(result).toBeNull();
        }));
    });
});
