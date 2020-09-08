"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.deleteUser = exports.updateUser = exports.saveUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../helpers/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsers = async (req, res) => {
    const limit = +(req.query.limit || 5);
    const skip = +(req.query.page || 1);
    try {
        const usersP = user_1.default.find({}, '-password')
            .limit(limit)
            .skip(limit * (skip - 1));
        const resultsP = user_1.default.countDocuments();
        const [users, results] = await Promise.all([usersP, resultsP]);
        res.status(200).json({ ok: true, users, results });
    }
    catch (error) {
        res.status(401).json({ ok: false, error });
    }
};
exports.getUsers = getUsers;
const saveUser = async (req, res) => {
    try {
        const body = req.body;
        const salt = await bcrypt_1.default.genSalt();
        body.password = await bcrypt_1.default.hash(body.password, salt);
        const prevUser = await user_1.default.findOne({ email: req.body.email });
        if (prevUser) {
            if (prevUser.get('google'))
                return res.status(400).json({ ok: false, error: { message: 'login with your google account please' } });
            return res.status(400).json({ ok: false, error: { message: 'user already exits' } });
        }
        const newUser = new user_1.default(body);
        const savedUser = await newUser.save();
        const token = jwt_1.signToken(savedUser._id);
        return res.status(200).json({ ok: true, message: 'User saved', token });
    }
    catch (error) {
        res.status(400).json({ ok: false, error });
    }
};
exports.saveUser = saveUser;
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { password, email, google, ...fields } = req.body;
        if (!!!google)
            fields.email = email;
        const updatedUser = await user_1.default.findByIdAndUpdate(id, fields, { runValidators: true, new: true, context: 'query' });
        if (updatedUser)
            return res.status(200).json({ ok: true, message: 'User updated', updatedUser });
        return res.status(404).json({ ok: true, error: { message: 'not user' } });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await user_1.default.findByIdAndRemove(id);
        if (deletedUser)
            return res.status(200).json({ ok: true, deletedUser, message: 'User deleted' });
        return res.status(404).json({ ok: false, error: { message: 'Not user' } });
    }
    catch (error) {
        return res.status(500).json({ ok: true, error });
    }
};
exports.deleteUser = deleteUser;
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await user_1.default.findById(id);
        if (user)
            return res.status(200).json({ ok: true, user });
        return res.status(404).json({ ok: false, error: { message: 'not user' } });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.getUserById = getUserById;
