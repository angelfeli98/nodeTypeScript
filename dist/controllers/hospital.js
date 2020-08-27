"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHospitals = exports.saveHspital = exports.test = void 0;
const hospital_1 = __importDefault(require("../models/hospital"));
const test = (req, res) => {
    res.status(200).json({ ok: true });
};
exports.test = test;
const saveHspital = async (req, res) => {
    try {
        const { currentUser, ...object } = req.body;
        object.madeBy = currentUser.id;
        const newHospital = new hospital_1.default(object);
        const savedHospital = await newHospital.save();
        res.status(200).json({ ok: true, savedHospital });
    }
    catch (error) {
        res.status(500).json({ ok: true, error });
    }
};
exports.saveHspital = saveHspital;
const getHospitalById = async (req, res) => {
};
const getHospitals = async (req, res) => {
    try {
        const hospitals = await hospital_1.default.find()
            .populate('madeBy', 'name img _id');
        if (hospitals)
            return res.status(200).json({ ok: true, hospitals });
        return res.status(404).json({ ok: false, error: { message: 'nos hospitals' } });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.getHospitals = getHospitals;
