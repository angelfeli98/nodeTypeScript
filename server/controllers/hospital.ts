
import { Request, Response } from 'express';
import Hospital from '../models/hospital';

const test = (req: Request, res: Response): void => {
    res.status(200).json({ok: true})
}

const saveHspital = async(req: Request, res: Response): Promise<void> => {
    try{
        const { currentUser, ...object } = req.body;
        object.madeBy = currentUser.id;

        const newHospital = new Hospital(object);
        const savedHospital = await newHospital.save();
        res.status(200).json({ok: true, savedHospital});
    }catch(error){
        res.status(500).json({ok: true, error});
    }
}

const getHospitalById = async(req: Request, res: Response): Promise<any> => {
}

const getHospitals = async(req: Request, res: Response): Promise<any> => {
    try{
        const hospitals = await Hospital.find()
                                        .populate('madeBy', 'name img _id');
        if(hospitals)
            return res.status(200).json({ok: true, hospitals})

        return res.status(404).json({ok: false, error: {message: 'nos hospitals'}})
    }catch(error){
        return res.status(500).json({ok: false, error})
    }
}

export{
    test,
    saveHspital,
    getHospitals
}