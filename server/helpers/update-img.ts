import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import Doctor from '../models/doctor';
import Hospital from '../models/hospital';

const updateImg = async(req: Request, res: Response, pathImg: string): Promise<any> => {
    const type = req.params.type;
    let result: mongoose.Document | null = null;
    const data = {img: pathImg};
    const opt = {new: false, context: 'query'};
    const id = req.params.id;
    try{
        switch(type){
            case 'user':
                result = await User.findByIdAndUpdate(id, data, opt);
            break;
            case 'doctor':
                result = await Doctor.findByIdAndUpdate(id, data, opt);
            break;
            case 'hospital':
                result = await Hospital.findByIdAndUpdate(id, data, opt);
            break;
            default:
                return res.status(403).json({ok: true, error: {message: `${type} is not a valid type`}});
        }
    }catch(error){
        return res.status(500).json({ok: false, error});
    }

    if(!!!result)
        return res.status(404).json({ok: false, error: {message: `${id} is not a vaild id for ${type}`}})
    return result;
}

export{
    updateImg
}