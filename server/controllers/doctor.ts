
import { Request, Response } from 'express';
import Doctor from '../models/doctor';
import Hospital from '../models/hospital';

const test = (req: Request, res: Response): void => {
    res.status(200).json({ok: true});
}

const saveDoctor = async(req: Request, res: Response): Promise<any> => {
    try{
        const { currentUser, ...object } = req.body;
        object.madeBy = currentUser.id;

        const newDoctor = new Doctor(object)
        const savedDoctor = await newDoctor.save();
        await Hospital.findByIdAndUpdate(object.hospital, {'$push': {'doctors': savedDoctor._id}});
        res.status(200).json({ok: true, savedDoctor});
    }catch(error){
        res.status(500).json({ok: false, error});
    }
}

const getDoctorById = async(req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id)
                                    .populate('madeBy')
                                    .populate('hospital');
        if(!!!doctor)
            return res.status(404).json({ok: false, error:{message: 'Not doctor'}})
        return res.status(200).json({ok: true, doctor});
    } catch (error) {
        return res.status(500).json({ok: false, error})
    }
}

const getDoctors = async(req: Request, res: Response): Promise<any> => {
    try{
        const limit = +(Number(req.query.limit) || '10');
        const page = +(Number(req.query.page) || 1);
        const Doctors = Doctor.find()
                                    .limit(limit)
                                    .skip(limit*(page-1))
                                    .populate('madeBy')
                                    .populate('hospital');
        const Total = Doctor.countDocuments();
        const [ doctors , total] = await Promise.all([Doctors, Total]);
        if(doctors)
            return res.status(200).json({ok: true, doctors, total});

        return res.status(404).json({ok: false, error: {message: 'nos doctors'}})
    }catch(error){
        return res.status(500).json({ok: false, error})
    }
}

const deleteDoctor = async(req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        if(!!!deletedDoctor)
            return res.status(404).json({ok: false, error:{message: 'not doctor to delete'}});
        const hospitalId = deletedDoctor.get('hospital');
        await Hospital.findByIdAndUpdate(hospitalId, {'$pull': {'doctors': deletedDoctor._id}});
        return res.status(200).json({ok: true, deletedDoctor});
    }catch(error){
        return res.status(500).json({ok: false, error})
    }
}

const updateDoctor = async(req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const data = req.body;
    const options = {new: true, context: 'query', runValidators: true};
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, data, options);
        if(!!!updatedDoctor)
            return res.status(404).json({ok: false, error:{message: 'not doctor to update'}});

        return res.status(200).json({ok: true, updatedDoctor})
    }catch(error){
        return res.status(500).json({ok: true, error})
    }
}

export{
    test,
    saveDoctor,
    getDoctors,
    deleteDoctor,
    updateDoctor,
    getDoctorById
}