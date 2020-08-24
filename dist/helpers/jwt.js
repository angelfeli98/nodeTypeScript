"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (id) => {
    const seed = process.env.SEED || 'test';
    const time = process.env.TIME;
    return jsonwebtoken_1.default.sign({ id }, seed, { expiresIn: time });
};
exports.signToken = signToken;
