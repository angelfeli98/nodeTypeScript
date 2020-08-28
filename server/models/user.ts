
import mongoose, { Schema } from 'mongoose';
import mongooseuniquevalidator from 'mongoose-unique-validator';

const roles: mongoose.SchemaTypeOpts.EnumOpts<any> = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'Eror {VALUE} is not a valid option'
}

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email must be provided'],
        uniqueCaseInsensitive : true,
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
},{
    toJSON: {
        transform: (doc, ret): any => {
            const {_id, __v, password, ...object} = ret;
            object.id = _id;
            return object;
        }
    }
})

const options = {
    message: 'Error, {PATH} must be unique, bad value {VALUE}'
}

userSchema.plugin(mongooseuniquevalidator, options);

export = mongoose.model('User', userSchema);
