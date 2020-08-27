
import { Request, Response } from 'express';
import expressfileload from 'express-fileupload'
import fs from 'fs';
import Path from 'path';
import { v4 as v4Uuid } from 'uuid';
import { updateImg } from '../helpers/update-img';


const test = (req: Request, res: Response): void => {
    res.status(200).json({ok: true});
}

const uploadFile = async(req: Request, res: Response): Promise<any> => {
    const {type} = req.params;

    if (!!!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ok: false, error: {message: 'not file'}});

    const validFileTypes = ['png', 'PNG', 'jpg', 'JPG', 'GIF', 'gif'];
    const file: any = req.files?.file;
    const name = file.name;
    const typeFile = name.split('.')[name.split('.').length - 1];
    const newName = `${v4Uuid()}.${typeFile}`;

    if(!!!validFileTypes.includes(typeFile))
        return res.status(400).json({ok: false, error: {message: `${typeFile} is not a valid extention`}});

    try {
        const result = await updateImg(req, res, newName);
        if(result.img && fs.existsSync(Path.resolve(__dirname, `../uploads/${type}/${result.img}`)))
            fs.unlinkSync(Path.resolve(__dirname, `../uploads/${type}/${result.img}`))

        result.img = newName;

        const path = Path.resolve(__dirname, `../uploads/${type}/${newName}`);

        file.mv(path);
        res.status(200).json({ok: true, result, message: 'image uploaded'});
    }catch(error){
        res.status(500).json({ok: false, error})
    }
}

const getImage = async(req: Request, res: Response): Promise<any> => {
    const {type, name} = req.params;

    const path = Path.resolve(__dirname, `../uploads/${type}/${name}`);

    if(!!!fs.existsSync(path))
        return res.status(200).sendFile(Path.resolve(__dirname, '../uploads/no-img.jpg'));

    return res.status(200).sendFile(path);

}

export{
    test,
    uploadFile,
    getImage
}