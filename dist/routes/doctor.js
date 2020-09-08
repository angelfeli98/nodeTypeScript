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
const Doctor = __importStar(require("../controllers/doctor"));
const verifyToken_1 = require("../middlewares/verifyToken");
const express_validator_1 = require("express-validator");
const fields_validators_1 = require("../middlewares/fields-validators");
const api = express_1.Router();
api.get('/test', Doctor.test);
api.get('/getDoctors', verifyToken_1.verifyToken, Doctor.getDoctors);
api.get('/getById/:id', verifyToken_1.verifyToken, Doctor.getDoctorById);
api.post('/save', [
    verifyToken_1.verifyToken,
    express_validator_1.check('hospital', 'hospital must be provided').notEmpty().isMongoId(),
    express_validator_1.check('name', 'name must be provided').notEmpty(),
    fields_validators_1.validateFields
], Doctor.saveDoctor);
api.put('/update/:id', verifyToken_1.verifyToken, Doctor.updateDoctor);
api.delete('/delete/:id', verifyToken_1.verifyToken, Doctor.deleteDoctor);
module.exports = api;
