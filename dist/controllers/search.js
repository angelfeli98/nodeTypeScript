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
        const userPromise = user_1.default.find(field).populate('madeBy');
        const doctorPromise = doctor_1.default.find(field).populate('madeBy').populate('hospital');
        const hospitalPromise = hospital_1.default.find(field).populate('doctors').populate('madeBy');
        const [user, doctor, hospital] = await Promise.all([userPromise, doctorPromise, hospitalPromise]);
        res.status(200).json({ ok: true, result: { user, doctor, hospital } });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
};
exports.searchInAll = searchInAll;
const searchByCollection = async (req, res) => {
    const limit = +(req.query.limit || 5);
    const page = +(req.query.page || 1);
    const field = { name: new RegExp(req.params.field, 'i') };
    const collection = req.params.collection;
    let resultsP = null;
    let NoResultsP = null;
    switch (collection) {
        case 'doctor':
            resultsP = doctor_1.default.find(field)
                .limit(limit)
                .skip(limit * (page - 1))
                .populate('madeBy')
                .populate('hospital');
            NoResultsP = doctor_1.default.countDocuments();
            break;
        case 'hospital':
            resultsP = hospital_1.default.find(field)
                .limit(limit)
                .skip(limit * (page - 1))
                .populate('madeBy', '_id name img');
            NoResultsP = hospital_1.default.where('name').equals('user 10').countDocuments();
            break;
        case 'user':
            resultsP = user_1.default.find(field)
                .limit(limit)
                .skip(limit * (page - 1));
            NoResultsP = user_1.default.where('user').equals('user 10').countDocuments();
            break;
        default:
            return res.status(404).json({ ok: false, error: { message: `${collection} is not a valid collection` } });
            break;
    }
    const [results, noResults] = await Promise.all([resultsP, NoResultsP]);
    if (results.length != 0)
        res.status(200).json({ ok: true, results, collection, noResults });
    else
        res.status(404).json({ ok: true, error: { message: `not results` } });
};
exports.searchByCollection = searchByCollection;
