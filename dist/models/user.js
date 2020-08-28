"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'Eror {VALUE} is not a valid option'
};
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email must be provided'],
        uniqueCaseInsensitive: true,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles,
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        unique: false
    },
    img: {
        type: String,
        required: false,
        default: ''
    },
    google: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            const { _id, __v, password, ...object } = ret;
            object.id = _id;
            return object;
        }
    }
});
const options = {
    message: 'Error, {PATH} must be unique, bad value {VALUE}'
};
userSchema.plugin(mongoose_unique_validator_1.default, options);
module.exports = mongoose_1.default.model('User', userSchema);
