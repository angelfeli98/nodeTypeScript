"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySelf = void 0;
const user_1 = __importDefault(require("../models/user"));
exports.verifySelf = async (req, res, next) => {
    const userM = await user_1.default.findById(req.body.currentUser.id);
    const id = req.params.id;
    if (userM?.get('role') !== 'ADMIN_ROLE' && id != req.body.currentUser.id)
        return res.status(403).json({ ok: true, error: { message: 'Not auth' } });
    return next();
};
