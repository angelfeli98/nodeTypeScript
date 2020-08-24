
import { Request, Response } from 'express';

const test = (req: Request, res: Response):void => {
    res.status(200).json({
        message: 'Hola'
    })
}

export{
    test
}