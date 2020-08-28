import { Schema, model } from 'mongoose';
import mongooseuniquevalidator from 'mongoose-unique-validator';


const hospitalSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },
    img: {
        type: String,
        required: false,
        default: ''
    },
    doctors :[
        {
            type: Schema.Types.ObjectId,
            ref: 'Doctor'
        }
    ],
    madeBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user must be provided']
    }
},{
    toJSON: {
        transform: (doc, ret): any => {
            const {_id, __v, ...object} = ret;
            object.id = _id;
            return object;
        }
    }
})

const options = {
    massage: 'the value for {PATH} must be unique, {VALUE} bad value'
}

hospitalSchema.plugin(mongooseuniquevalidator, options);

export = model('Hospital', hospitalSchema)