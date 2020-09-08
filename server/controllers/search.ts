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
        const userPromise = User.find(field).populate('madeBy');
        const doctorPromise = Doctor.find(field).populate('madeBy').populate('hospital');
        const hospitalPromise = Hospital.find(field).populate('doctors').populate('madeBy');
        const [user, doctor, hospital] = await Promise.all([userPromise, doctorPromise, hospitalPromise]);
        res.status(200).json({ok: true, result: {user, doctor, hospital}});
    }catch(error){
        res.status(500).json({ok: false, error})
    }
}

const searchByCollection = async(req: Request, res: Response): Promise<any> => {
    const limit = +(req.query.limit || 5);
    const page = +(req.query.page || 1);
    const field = {name: new RegExp(req.params.field, 'i')};
    const collection = req.params.collection;
    let resultsP: mongoose.DocumentQuery<any, any> | null = null;
    let NoResultsP: mongoose.Query<number> | null = null;
    switch (collection){
        case 'doctor':
            resultsP = Doctor.find(field)
                                    .limit(limit)
                                    .skip(limit * (page - 1))
                                    .populate('madeBy')
                                    .populate('hospital');
            NoResultsP = Doctor.countDocuments();
        break;
        case 'hospital':
            resultsP = Hospital.find(field)
                                    .limit(limit)
                                    .skip(limit * (page - 1))
                                    .populate('madeBy', '_id name img');
            NoResultsP = Hospital.where('name').equals('user 10').countDocuments();
        break;
        case 'user':
            resultsP = User.find(field)
                                .limit(limit)
                                .skip(limit * (page - 1));
            NoResultsP = User.where('user').equals('user 10').countDocuments();
        break;
        default:
            return res.status(404).json({ok: false, error: {message: `${collection} is not a valid collection`}});
        break;
    }
    const [results, noResults] = await Promise.all([resultsP, NoResultsP]);
    if(results.length != 0)
        res.status(200).json({ok: true, results, collection, noResults});
    else
        res.status(404).json({ok: true, error: {message: `not results`}});

}

export{
    test,
    searchInAll,
    searchByCollection
}