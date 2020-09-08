"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reEnvToken = exports.loginByGoogle = exports.loginUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../helpers/jwt");
const bcrypt_2 = __importDefault(require("bcrypt"));
const menu_options_1 = require("../helpers/menu-options");
const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await user_1.default.findOne({ email });
        if (user) {
            if (await bcrypt_1.default.compare(password, user.get('password'))) {
                const jwt = jwt_1.signToken(user._id);
                const menu = menu_options_1.getMenu(user?.get('role'));
                res.status(200).json({ ok: true, token: jwt, menu });
            }
            else
                res.status(400).json({ ok: false, error: { message: 'email or password incorrect' } });
        }
        else
            res.status(400).json({ ok: false, error: { message: 'email or password incorrect' } });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
};
exports.loginUser = loginUser;
const reEnvToken = async (req, res) => {
    const currentUser = req.body.currentUser;
    const newToken = jwt_1.signToken(currentUser.id);
    const user = await user_1.default.findById(currentUser.id);
    const menu = menu_options_1.getMenu(user?.get('role'));
    return res.status(200).json({ ok: true, token: newToken, user, menu });
};
exports.reEnvToken = reEnvToken;
const loginByGoogle = async (req, res) => {
    const { id, ...object } = req.body;
    try {
        let user = await user_1.default.findOne({ email: object.email });
        if (!!!user) {
            const salts = await bcrypt_2.default.genSalt();
            object.password = await bcrypt_2.default.hash(id, salts);
            object.google = true;
            const newUser = new user_1.default(object);
            user = await newUser.save();
        }
        if (!!!user.get('google'))
            return res.status(400).json({ ok: false, error: { message: 'login with your email and password' } });
        const jwt = jwt_1.signToken(user._id);
        const menu = menu_options_1.getMenu(user?.get('role'));
        return res.status(200).json({ ok: true, token: jwt, menu });
    }
    catch (error) {
        return res.status(500).json({ ok: false, error });
    }
};
exports.loginByGoogle = loginByGoogle;
