"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = exports.test = void 0;
const databaseClass_1 = __importDefault(require("../sql/databaseClass"));
const bcrypt_1 = require("bcrypt");
const database = new databaseClass_1.default();
const salts = 10;
const test = (req, res) => {
    res.status(200).json({ ok: true });
};
exports.test = test;
const saveUser = async (req, res) => {
    try {
        const body = req.body;
        body.password = bcrypt_1.hashSync(body.password, salts);
        const data = {
            userName: body.user,
            surename: body.surename,
            passw: body.password
        };
        const query = `
            INSERT INTO usuarios SET ?;
        `;
        await database.makeQuery(query, data, (err, data, fields) => {
            if (err)
                throw err;
            else
                res.status(200).json({ ok: true, data });
        });
    }
    catch (err) {
        res.status(500).json({ ok: false, err });
    }
};
exports.saveUser = saveUser;
