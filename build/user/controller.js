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
const user_1 = require("../models/user");
class UserCtrl {
    //creating new User
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.passwort,
            };
            const newUser = yield service_1.default.newUser(user);
            res.json(newUser);
        });
    }
    ;
    //user login function
    static userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password
            };
            const authentication = yield service_1.default.getPassword(user);
            if (authentication === null) {
                return res.send("Login failure. Firstname or lastname or password wrong. Please try again");
            }
            const publicToken = yield (0, user_1.generateUserToken)(user);
            res.header("authorization", publicToken);
            res.send(`Welcome back ${user.firstname} ${user.lastname}!`);
        });
    }
    ;
    //getting all available Users
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publicToken = req.headers.authorization;
                console.log("publictoken= " + publicToken);
                const users = yield service_1.default.getAll();
                res.send(users);
            }
            catch (e) {
                res.status(400).send("Unknown Error " + e);
            }
        });
    }
    //getting single user searched by id
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleUser = yield service_1.default.getById(req.params.id);
            if (singleUser === undefined) {
                res.status(404).send("Error: User doesn't exists");
            }
            ;
            res.send(singleUser);
        });
    }
    ;
}
exports.default = UserCtrl;
