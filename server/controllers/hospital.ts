
import { Request, Response } from 'express';
import Hospital from '../models/hospital';
import Doctor from '../models/doctor';

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
    const id = req.params.id;
    try {
        const hospital = await Hospital.findById(id)
                                        .populate('madeBy', '_id name email img')
                                        .populate('doctors', 'name img _id');
        if(!!!hospital)
        return res.status(404).json({ok: false, error: {message: `not hospital for ${id}`}});
    }catch(error){
        return res.status(500).json({ok: false, error});
    }
}

const getHospitals = async(req: Request, res: Response): Promise<any> => {
    const page = +(req.query.page || 1);
    const limit = +(req.query?.limit || 10);
    try{
        const hospitals = await Hospital.find()
                                        .limit(limit)
                                        .skip((page - 1)*limit)
                                        .populate('madeBy', '_id name img email')
                                        .populate('doctors', 'name _id img');
        if(hospitals)
            return res.status(200).json({ok: true, hospitals})

        return res.status(404).json({ok: false, error: {message: 'nos hospitals'}})
    }catch(error){
        return res.status(500).json({ok: false, error})
    }
}

const updateHospital = async(req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const data = req.body;
    const options = {new: true, context: 'query', runValidators: true};
    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(id, data, options);
        if(!!!updatedHospital)
            return res.status(404).json({ok: false, error: {message: 'not hospital to update'}});
        return res.status(200).json({ok: true, updatedHospital});
    }catch(error){
        return res.status(500).json({ok: false, error});
    }
}

const deleteHospital = async(req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {
        const deletedHospital = await Hospital.findByIdAndRemove(id);
        if(!!!deletedHospital)
            return res.status(404).json({ok: true, error: {message: 'not hospital to delete'}});
        const hospital = id;
        await Doctor.remove({hospital})
        return res.status(200).json({ok: true, deletedHospital});
    }catch(error){
        return res.status(500).json({ok: false, error});
    }
}

export{
    test,
    saveHspital,
    getHospitals,
    deleteHospital,
    getHospitalById,
    updateHospital
}