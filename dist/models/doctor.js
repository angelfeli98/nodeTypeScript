"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const doctorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: ['true', 'name must be provided']
    },
    img: {
        type: String,
        required: false,
        default: ''
    },
    hospital: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'Hospital must be provided']
    },
    madeBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User must be provided']
    }
});
const options = {
    message: 'the value for {PATH} must be unique, {VALUE} bad value'
};
doctorSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
doctorSchema.plugin(mongoose_unique_validator_1.default, options);
module.exports = mongoose_1.model('Doctor', doctorSchema);
