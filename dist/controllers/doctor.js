"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctors = exports.saveDoctor = exports.test = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const test = (req, res) => {
    res.status(200).json({ ok: true });
};
exports.test = test;
const saveDoctor = async (req, res) => {
    try {
        const { currentUser, ...object } = req.body;
        object.madeBy = currentUser.id;
        const newDoctor = new doctor_1.default(object);
        const savedDoctor = await newDoctor.save();
        res.status(200).json({ ok: true, savedDoctor });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
};
exports.saveDoctor = saveDoctor;
const getDoctors = async (req, res) => {
    try {
        const limit = +(Number(req.query.limit) || '10');
        const page = +(Number(req.query.page) || 1);
        const Doctors = doctor_1.default.find()
            .limit(limit)
            .skip(limit * (page - 1))
            .populate('madeBy', 'name img _id')
            .populate('hospital', 'name');
        const Total = doctor_1.default.countDocuments();
        const [doctors, total] = await Promise.all([Doctors, Total]);
        if (doctors)
            return res.status(200).json({ ok: true, doctors, total });
        return res.status(404).json({ ok: false, error: { message: 'nos doctors' } });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.getDoctors = getDoctors;
