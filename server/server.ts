
import express from 'express';
import DataBase from './database/db';
import cors from 'cors';
import bodyparser from 'body-parser';
import fileupload from 'express-fileupload'

import Api_user from './routes/user';
import Api_auth from './routes/auth';
import Api_hospital from './routes/hospital';
import Api_doctor from './routes/doctor';
import Api_search from './routes/search';
import Api_File from './routes/file';
export class Server{

    private port: any;
    private server: express.Application;
    private api_users: express.Router;
    private api_auth: express.Router;
    private api_hospital: express.Router;
    private api_doctor: express.Router;
    private api_search: express.Router;
    private api_file: express.Router;

    constructor(){
        this.port = process.env.PORT;
        this.server = express();
        this.api_users = Api_user;
        this.api_auth = Api_auth;
        this.api_hospital = Api_hospital;
        this.api_doctor = Api_doctor;
        this.api_search = Api_search;
        this.api_file = Api_File;

        this.configServer();
        this.initServer();
    }

    private configServer = (): void => {
        this.makeConnectionToDB();

        this.server.use(cors());
        this.server.use(bodyparser.urlencoded({extended: false}));
        this.server.use(bodyparser.json());
        this.server.use(fileupload());

        this.server.use('/user', this.api_users);
        this.server.use('/auth', this.api_auth);
        this.server.use('/hospital', this.api_hospital);
        this.server.use('/doctor', this.api_doctor);
        this.server.use('/search', this.api_search);
        this.server.use('/file', this.api_file);
    }

    private makeConnectionToDB = (): void => {
        const connection = new DataBase();
    }

    private initServer = (): void => {
        this.server.listen(this.port, () => {
            console.log(`Server ready at http://localhost:${this.port}`)
        })
    }
}