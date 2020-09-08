"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = void 0;
const user_1 = __importDefault(require("../models/user"));
exports.verifyRole = async (req, res, next) => {
    const user = req.body.currentUser;
    const userInfo = await user_1.default.findById(user.id);
    const role = userInfo?.get('role');
    if (role !== 'ADMIN_ROLE')
        return res.status(403).json({ ok: false, error: { message: 'not auth' } });
    return next();
};
