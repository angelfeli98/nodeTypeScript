
import { Request, Response } from 'express';
import DataBase from '../sql/databaseClass';
import { hashSync, compareSync } from 'bcrypt';

const database = new DataBase();
const salts = 10;

const test = (req : Request, res: Response) => {
    res.status(200).json({ok : true})
}

const saveUser = async(req: Request, res: Response) => {
    try{
        const body = req.body;
        body.password = hashSync(body.password, salts);

        const data = {
            userName : body.user,
            surename : body.surename,
            passw : body.password
        };
        const query = `
            INSERT INTO usuarios SET ?;
        `;

        await database.makeQuery(query, data, (err : boolean, data : Object, fields : any) => {
            if(err)
                throw err;
            else
                res.status(200).json({ok : true, data});
        });
    }catch(err){
        res.status(500).json({ok : false, err});
    }
}

export{
    test,
    saveUser
}