"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const controller_1 = __importDefault(require("./controller"));
exports.default = (0, express_1.Router)().get('/:id', [auth_1.default], controller_1.default.getOrder);
