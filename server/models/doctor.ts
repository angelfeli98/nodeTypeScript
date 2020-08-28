
import { Schema, model } from 'mongoose';
import mongooseuniquevalidator from 'mongoose-unique-validator';

const doctorSchema: Schema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'Hospital must be provided']
    },
    madeBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User must be provided']
    }
},{
    toJSON: {
        transform: (doc, ret): any => {
            const { __v, _id, ...object } = ret;
            object.id = _id;
            return object;
        }
    }
})

const options = {
    message: 'the value for {PATH} must be unique, {VALUE} bad value'
}

doctorSchema.plugin(mongooseuniquevalidator, options)

export = model('Doctor', doctorSchema);