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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User = __importStar(require("../controllers/user"));
const fields_validators_1 = require("../middlewares/fields-validators");
const express_validator_1 = require("express-validator");
const verifyToken_1 = require("../middlewares/verifyToken");
const app = express_1.default.Router();
app.get('/getUsers', User.getUsers);
app.get('/getUser/:id', verifyToken_1.verifyToken, User.getUserById);
app.post('/saveUser', [
    verifyToken_1.verifyToken,
    express_validator_1.check('name', 'name must be porvided').notEmpty(),
    express_validator_1.check('email', 'email must be porvided').not().notEmpty().isEmail(),
    express_validator_1.check('password', 'password must be porvided').notEmpty(),
    fields_validators_1.validateFields
], User.saveUser);
app.put('/updateUser/:id', verifyToken_1.verifyToken, User.updateUser);
app.delete('/deleteUser/:id', verifyToken_1.verifyToken, User.deleteUser);
exports.default = app;
