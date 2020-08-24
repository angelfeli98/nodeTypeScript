
import express from 'express';
import DataBase from './database/db';
import cors from 'cors';
import bodyparser from 'body-parser';

import Api_user from './routes/user';
import Api_auth from './routes/auth';
export class Server{

    private port: any;
    private server: express.Application;
    private api_users: express.Router;
    private api_auth: express.Router;

    constructor(){
        this.port = process.env.PORT;
        this.server = express();
        this.api_users = Api_user;
        this.api_auth = Api_auth;
        this.configServer();
        this.initServer();
    }

    private configServer = (): void => {
        this.makeConnectionToDB();

        this.server.use(cors());
        this.server.use(bodyparser.urlencoded({extended: false}));
        this.server.use(bodyparser.json());

        this.server.use('/user', this.api_users);
        this.server.use('/auth', this.api_auth)
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