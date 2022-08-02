"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const server_1 = __importDefault(require("./server"));
const port = 3000;
exports.server = server_1.default.listen(port, function () {
    console.log(`starting app on: ${port}`);
});
// export const closeServer = server.close();
