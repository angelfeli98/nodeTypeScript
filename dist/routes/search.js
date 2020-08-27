"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const Search = __importStar(require("../controllers/search"));
const express_validator_1 = require("express-validator");
const fields_validators_1 = require("../middlewares/fields-validators");
const api = express_1.Router();
api.get('/test/:field', verifyToken_1.verifyToken, Search.test);
api.get('/inAll/:field', [
    verifyToken_1.verifyToken,
    express_validator_1.check('field', 'field must be provided').notEmpty(),
    fields_validators_1.validateFields
], Search.searchInAll);
api.get('/inCollection/:collection/:field', [
    verifyToken_1.verifyToken,
    express_validator_1.check('collection', 'collection must be provided').notEmpty(),
    express_validator_1.check('field', 'field must be probided').notEmpty(),
    fields_validators_1.validateFields
], Search.searchByCollection);
module.exports = api;
