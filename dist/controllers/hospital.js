"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHospital = exports.getHospitalById = exports.deleteHospital = exports.getHospitals = exports.saveHspital = exports.test = void 0;
const hospital_1 = __importDefault(require("../models/hospital"));
const doctor_1 = __importDefault(require("../models/doctor"));
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
    const id = req.params.id;
    try {
        const hospital = await hospital_1.default.findById(id)
            .populate('madeBy', '_id name email img')
            .populate('doctors', 'name img _id');
        if (!!!hospital)
            return res.status(404).json({ ok: false, error: { message: `not hospital for ${id}` } });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.getHospitalById = getHospitalById;
const getHospitals = async (req, res) => {
    const page = +(req.query.page || 1);
    const limit = +(req.query?.limit || 10);
    try {
        const hospitals = await hospital_1.default.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .populate('madeBy', '_id name img email')
            .populate('doctors', 'name _id img');
        if (hospitals)
            return res.status(200).json({ ok: true, hospitals });
        return res.status(404).json({ ok: false, error: { message: 'nos hospitals' } });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.getHospitals = getHospitals;
const updateHospital = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true, context: 'query', runValidators: true };
    try {
        const updatedHospital = await hospital_1.default.findByIdAndUpdate(id, data, options);
        if (!!!updatedHospital)
            return res.status(404).json({ ok: false, error: { message: 'not hospital to update' } });
        return res.status(200).json({ ok: true, updatedHospital });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.updateHospital = updateHospital;
const deleteHospital = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedHospital = await hospital_1.default.findByIdAndRemove(id);
        if (!!!deletedHospital)
            return res.status(404).json({ ok: true, error: { message: 'not hospital to delete' } });
        const hospital = id;
        await doctor_1.default.remove({ hospital });
        return res.status(200).json({ ok: true, deletedHospital });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.deleteHospital = deleteHospital;
