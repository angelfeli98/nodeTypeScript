"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.uploadFile = exports.test = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const update_img_1 = require("../helpers/update-img");
const test = (req, res) => {
    res.status(200).json({ ok: true });
};
exports.test = test;
const uploadFile = async (req, res) => {
    const { type } = req.params;
    if (!!!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ ok: false, error: { message: 'not file' } });
    const validFileTypes = ['png', 'PNG', 'jpg', 'JPG', 'GIF', 'gif'];
    const file = req.files?.file;
    const name = file.name;
    const typeFile = name.split('.')[name.split('.').length - 1];
    const newName = `${uuid_1.v4()}.${typeFile}`;
    if (!!!validFileTypes.includes(typeFile))
        return res.status(400).json({ ok: false, error: { message: `${typeFile} is not a valid extention` } });
    try {
        const result = await update_img_1.updateImg(req, res, newName);
        if (result.img && fs_1.default.existsSync(path_1.default.resolve(__dirname, `../uploads/${type}/${result.img}`)))
            fs_1.default.unlinkSync(path_1.default.resolve(__dirname, `../uploads/${type}/${result.img}`));
        result.img = newName;
        const path = path_1.default.resolve(__dirname, `../uploads/${type}/${newName}`);
        file.mv(path);
        res.status(200).json({ ok: true, result, message: 'image uploaded' });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
};
exports.uploadFile = uploadFile;
const getImage = async (req, res) => {
    const { type, name } = req.params;
    const path = path_1.default.resolve(__dirname, `../uploads/${type}/${name}`);
    if (!!!fs_1.default.existsSync(path))
        return res.status(200).sendFile(path_1.default.resolve(__dirname, '../uploads/no-img.jpg'));
    return res.status(200).sendFile(path);
};
exports.getImage = getImage;
