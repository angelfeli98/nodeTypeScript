
import express from 'express';
import Api_user from './routes/user';
import DataBase from './database/db';
import cors from 'cors';

export class Server{

    private port: any;
    private server: express.Application;
    private api_users: express.Router;

    constructor(){
        this.port = process.env.PORT;
        this.server = express();
        this.api_users = Api_user;

        this.configServer();
        this.initServer();
    }

    private configServer = (): void => {
        this.makeConnectionToDB();

        this.server.use(cors());

        this.server.use('/user', this.api_users);
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