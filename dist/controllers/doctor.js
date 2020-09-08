"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorById = exports.updateDoctor = exports.deleteDoctor = exports.getDoctors = exports.saveDoctor = exports.test = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const hospital_1 = __importDefault(require("../models/hospital"));
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
        await hospital_1.default.findByIdAndUpdate(object.hospital, { '$push': { 'doctors': savedDoctor._id } });
        res.status(200).json({ ok: true, savedDoctor });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
};
exports.saveDoctor = saveDoctor;
const getDoctorById = async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await doctor_1.default.findById(id)
            .populate('madeBy')
            .populate('hospital');
        if (!!!doctor)
            return res.status(404).json({ ok: false, error: { message: 'Not doctor' } });
        return res.status(200).json({ ok: true, doctor });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.getDoctorById = getDoctorById;
const getDoctors = async (req, res) => {
    try {
        const limit = +(Number(req.query.limit) || '10');
        const page = +(Number(req.query.page) || 1);
        const Doctors = doctor_1.default.find()
            .limit(limit)
            .skip(limit * (page - 1))
            .populate('madeBy')
            .populate('hospital');
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
const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedDoctor = await doctor_1.default.findByIdAndDelete(id);
        if (!!!deletedDoctor)
            return res.status(404).json({ ok: false, error: { message: 'not doctor to delete' } });
        const hospitalId = deletedDoctor.get('hospital');
        await hospital_1.default.findByIdAndUpdate(hospitalId, { '$pull': { 'doctors': deletedDoctor._id } });
        return res.status(200).json({ ok: true, deletedDoctor });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.deleteDoctor = deleteDoctor;
const updateDoctor = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true, context: 'query', runValidators: true };
    try {
        const updatedDoctor = await doctor_1.default.findByIdAndUpdate(id, data, options);
        if (!!!updatedDoctor)
            return res.status(404).json({ ok: false, error: { message: 'not doctor to update' } });
        return res.status(200).json({ ok: true, updatedDoctor });
    }
    catch (error) {
        return res.status(500).json({ ok: true, error });
    }
};
exports.updateDoctor = updateDoctor;
