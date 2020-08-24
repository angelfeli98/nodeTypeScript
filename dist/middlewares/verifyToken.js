"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.verifyToken = (req, res, next) => {
    const seed = process.env.SEED || 'test';
    const token = req.get('x-token') || '';
    if (!!!token)
        res.status(403).json({ ok: false, error: { message: 'Token not provided' } });
    else
        try {
            const data = jsonwebtoken_1.default.verify(token, seed);
            req.body.currentUser = data;
            next();
        }
        catch (error) {
            res.status(403).json({ ok: false, error: { message: 'Corrupt token' } });
        }
};
