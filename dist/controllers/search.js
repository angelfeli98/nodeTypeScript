"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByCollection = exports.searchInAll = exports.test = void 0;
const user_1 = __importDefault(require("../models/user"));
const hospital_1 = __importDefault(require("../models/hospital"));
const doctor_1 = __importDefault(require("../models/doctor"));
const test = (req, res) => {
    const field = req.params.field;
    res.status(200).json({ ok: true, field });
};
exports.test = test;
const searchInAll = async (req, res) => {
    const field = { name: new RegExp(req.params.field, 'i') };
    try {
        const userPromise = user_1.default.find(field);
        const doctorPromise = doctor_1.default.find(field);
        const hospitalPromise = hospital_1.default.find(field);
        const [user, doctor, hospital] = await Promise.all([userPromise, doctorPromise, hospitalPromise]);
        res.status(200).json({ ok: true, result: { user, doctor, hospital } });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
};
exports.searchInAll = searchInAll;
const searchByCollection = async (req, res) => {
    const field = { name: new RegExp(req.params.field, 'i') };
    const collection = req.params.collection;
    let results = [];
    switch (collection) {
        case 'doctor':
            results = await doctor_1.default.find(field).populate('madeBy', '_id name img');
            break;
        case 'hospital':
            results = await hospital_1.default.find(field).populate('madeBy', '_id name img');
            break;
        case 'user':
            results = await user_1.default.find(field);
            break;
        default:
            res.status(404).json({ ok: false, error: { message: `${collection} is not a valid collection` } });
            break;
    }
    if (results.length != 0)
        res.status(200).json({ ok: true, results, collection });
    else
        res.status(404).json({ ok: true, error: { message: `not results` } });
};
exports.searchByCollection = searchByCollection;
