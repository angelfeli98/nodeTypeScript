import { Request, Response } from 'express';
import User from '../models/user';
import Hospital from '../models/hospital';
import Doctor from '../models/doctor';
import mongoose from 'mongoose';

const test = (req: Request, res: Response): void => {
    const field = req.params.field;
    res.status(200).json({ok: true, field})
}

const searchInAll = async(req: Request, res: Response): Promise<void> => {
    const field = {name: new RegExp(req.params.field, 'i')};
    try {
        const userPromise = User.find(field);
        const doctorPromise = Doctor.find(field);
        const hospitalPromise = Hospital.find(field);
        const [user, doctor, hospital] = await Promise.all([userPromise, doctorPromise, hospitalPromise]);
        res.status(200).json({ok: true, result: {user, doctor, hospital}});
    }catch(error){
        res.status(500).json({ok: false, error})
    }
}

const searchByCollection = async(req: Request, res: Response): Promise<void> => {
    const field = {name: new RegExp(req.params.field, 'i')};
    const collection = req.params.collection;
    let results: mongoose.Document[] = [];
    switch (collection){
        case 'doctor':
            results = await Doctor.find(field).populate('madeBy', '_id name img');
        break;
        case 'hospital':
            results = await Hospital.find(field).populate('madeBy', '_id name img');
        break;
        case 'user':
            results = await User.find(field);
        break;
        default:
            res.status(404).json({ok: false, error: {message: `${collection} is not a valid collection`}});
        break;
    }
    if(results.length != 0)
        res.status(200).json({ok: true, results, collection});
    else
        res.status(404).json({ok: true, error: {message: `not results`}});

}

export{
    test,
    searchInAll,
    searchByCollection
}