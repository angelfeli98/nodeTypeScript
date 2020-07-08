"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appClass_1 = __importDefault(require("./appClass"));
const databaseClass_1 = __importDefault(require("./sql/databaseClass"));
const database = new databaseClass_1.default();
const port = 7070;
const server = new appClass_1.default(port);
server.runServer(() => {
    console.log(`Server ready at http://localhost:${server.getPort()}`);
});
