
import express = require('express');
import cors = require('cors');
import path = require('path');
import bodyparser = require('body-parser');
import { router } from './router/user';

export default class Server{

    private static server: Server;

    private app: express.Application;
    private port : number;
    private api : any;

    constructor(port : number){
        this.app = express();
        this.port = port;

        this.api = router;

        if(!!!Server.server){
            Server.server = this;
            this.useServer();
            return this;
        }else
            return Server.server;
    }

    private useServer(){
        this.app.use(express.static(path.resolve(__dirname, 'public')));
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended: false}));
        this.app.use(cors());

        this.app.use('/user', this.api);
    }

    public runServer(callback : Function){
        this.app.listen(this.port, callback())
    }

    public getPort(){
        return this.port
    }
}