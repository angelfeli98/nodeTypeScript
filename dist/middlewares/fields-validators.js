"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
exports.validateFields = (req, res, next) => {
    const result = express_validator_1.validationResult(req);
    if (!!!result.isEmpty())
        res.status(400).json({ ok: false, errors: result.mapped() });
    else
        next();
};
