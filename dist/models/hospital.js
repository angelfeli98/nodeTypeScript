"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const hospitalSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },
    img: {
        type: String,
        required: false,
        default: ''
    },
    doctors: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Doctor'
        }
    ],
    madeBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user must be provided']
    }
});
const options = {
    massage: 'the value for {PATH} must be unique, {VALUE} bad value'
};
hospitalSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
hospitalSchema.plugin(mongoose_unique_validator_1.default, options);
module.exports = mongoose_1.model('Hospital', hospitalSchema);
