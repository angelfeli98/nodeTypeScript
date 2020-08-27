"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImg = void 0;
const user_1 = __importDefault(require("../models/user"));
const doctor_1 = __importDefault(require("../models/doctor"));
const hospital_1 = __importDefault(require("../models/hospital"));
const updateImg = async (req, res, pathImg) => {
    const type = req.params.type;
    let result = null;
    const data = { img: pathImg };
    const opt = { new: false, context: 'query' };
    const id = req.params.id;
    try {
        switch (type) {
            case 'user':
                result = await user_1.default.findByIdAndUpdate(id, data, opt);
                break;
            case 'doctor':
                result = await doctor_1.default.findByIdAndUpdate(id, data, opt);
                break;
            case 'hospital':
                result = await hospital_1.default.findByIdAndUpdate(id, data, opt);
                break;
            default:
                throw { message: `${type} is not a valid type` };
        }
    }
    catch (error) {
        throw error;
    }
    if (!!!result)
        throw { message: `${id} is not a vaild id for ${type}` };
    return result;
};
exports.updateImg = updateImg;
