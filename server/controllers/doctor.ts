
import { Request, Response } from 'express';
import Doctor from '../models/doctor';

const test = (req: Request, res: Response): void => {
    res.status(200).json({ok: true});
}

const saveDoctor = async(req: Request, res: Response): Promise<any> => {
    try{
        const { currentUser, ...object } = req.body;
        object.madeBy = currentUser.id;

        const newDoctor = new Doctor(object)
        const savedDoctor = await newDoctor.save();
        res.status(200).json({ok: true, savedDoctor});
    }catch(error){
        res.status(500).json({ok: false, error});
    }
}

const getDoctors = async(req: Request, res: Response): Promise<any> => {
    try{
        const limit = +(Number(req.query.limit) || '10');
        const page = +(Number(req.query.page) || 1);
        const Doctors = Doctor.find()
                                    .limit(limit)
                                    .skip(limit*(page-1))
                                    .populate('madeBy', 'name img _id')
                                    .populate('hospital', 'name');
        const Total = Doctor.countDocuments();
        const [ doctors , total] = await Promise.all([Doctors, Total]);
        if(doctors)
            return res.status(200).json({ok: true, doctors, total});

        return res.status(404).json({ok: false, error: {message: 'nos doctors'}})
    }catch(error){
        return res.status(500).json({ok: false, error})
    }
}

export{
    test,
    saveDoctor,
    getDoctors
}