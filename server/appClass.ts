
import express = require('express');
import cors = require('cors');
import path = require('path');
import bodyparser = require('body-parser');

export default class Server{

    private static server: Server;

    private app: express.Application;
    private port : number;

    constructor(port : number){
        this.app = express();
        this.port = port;

        if(!!!Server.server){
            Server.server = this;
            return this;
        }else
            return Server.server;
    }

    public useServer(){
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended: false}));
        this.app.use(cors());
    }

    public runServer(callback : Function){
        this.app.listen(this.port, callback())
    }

    public getPort(){
        return this.port
    }
}